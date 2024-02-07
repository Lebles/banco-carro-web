import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
// import './bootstrap.min.css';

import UIPage from './UIPage';
import ImageUploader from './ImgInput';
import ImageSlideDisplay from './ImgShow';

export default function Main() {
  const [formData, setFormData] = useState({
    valor: undefined,
    condicion: '',
    tipo: '',
    marca: '',
    modelo: '',
    submodelo: '',
    anno: 2010
  });
  const [images, setImages] = useState([]);
  const img_admin = [images, setImages];

  const [ waiting, setWaiting ] = useState(0);

  //#region done
  useEffect(() => {
    let id = sessionStorage.getItem('to_main');
    id = Number.parseInt(id);
    console.log('id: '+id);
    if (id >= 0) {
      axios.get('http://localhost:8080/api/main/carro/'+id)
      .then((r) => {
        setFormData(r.data.carro);
        setImages(r.data.images);
        if (sessionStorage.getItem('qr_direct') === 'true') {
          setWaiting(2); sessionStorage.setItem('qr_direct', 'false')
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSave() {
    if (formData.marca.length === 0 && (formData.modelo.length === 0 || formData.submodelo.length === 0))
    {
      console.log("no se permite");
      return;
    }
    setWaiting(1);

    const url_imgs = Array(img_admin[0].length);
    for (let i = 0; i < url_imgs.length; i++) {
      if (typeof img_admin[0][i] === 'string') url_imgs[i] = img_admin[0][i];
      else url_imgs[i] = await readFileAsBase64(img_admin[0][i]);
    }

    await axios.post(`http://localhost:8080/api/main/carro/save`, {formData, images: url_imgs});
    window.location.assign('/list');
  }
  //#endregion done

  if (waiting === 1) {
    return (<UIPage>
      <h3 style={{margin: 30}}>Esperando Resultados</h3>
    </UIPage>);
  }

  return (<UIPage>
  <div style={{marginInline: 100}}>
    <h1>Datos del Vehiculo {formData.id ? 'id: '+formData.id : 'Nueva Entrada'}</h1>
    <ImageSlideDisplay enviroment={img_admin} />
  </div>
  <div className='mainInputs' style={{display: 'flex'}}>
    <div style={{flex: 1}}>
      <div className='field'><label>Valor del Vehiculo</label>
      <input type='number' placeholder='RD$$$'
      name="valor" value={formData.valor} onChange={handleChange} /></div>

      <div className='field'><label>Marca del Vehiculo</label>
      <input type='text' placeholder='Escribe algo...'
      name="marca" value={formData.marca} onChange={handleChange} /></div>

      <div className='field'><label>Modelo del Vehiculo</label>
      <input type='text' placeholder='Escribe algo...'
      name="modelo" value={formData.modelo} onChange={handleChange} /></div>

      <div className='field'><label>Año del Vehiculo</label>
      <input type='number'
      name="anno" value={formData.anno} onChange={handleChange}/></div>

      <div style={{textAlign: 'start'}}><label className='button' onClick={handleSave}>Guardar</label>
      <label className='button' onClick={() => window.location.assign('/list')}>Descartar</label>
      <label className='button' onClick={() => setWaiting(2)}>Generar QR</label></div>
    </div>
    <div style={{flex: 1}}>
      <div className='field'><label>Condicion del Vehiculo</label>
      <select name="condicion" onChange={handleChange} value={formData.condicion}>
        <option value="">Selecciona una opcion</option>
        <option value="Nuevo">Nuevo</option>
        <option value="Usado">Usado</option>
        <option value="Golpeado">Golpeado</option>
        <option value="Muy Usado">Muy Usado</option>
        <option value="Accidentado">Accidentado</option>
      </select></div>

      <div className='field'><label>Tipo de Vehiculo</label>
      <input type='text' placeholder='Escribe algo...'
      name="tipo" value={formData.tipo} onChange={handleChange} /></div>

      <div className='field'><label>Sub Modelo</label>
      <input type='text' placeholder='Escribe algo...'
      name="submodelo" value={formData.submodelo} onChange={handleChange}/></div>

      <div className='field'><label>Cargar Imagenes del Vehiculo</label>
      <ImageUploader enviroment={img_admin}/></div>
    </div>
  </div>
  {waiting === 2 && (<DownloadableQR formData={formData}/>)}
  </UIPage>);
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

function DownloadableQR({formData}) {
  const qr_ref = useRef(null); //

  const downloadQRCode = () => {
    if (qr_ref.current) {
      html2canvas(qr_ref.current)
        .then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `qrcode_item_${formData.id ? formData.id : 'nuevo'}.png`;
          link.click();
        })
        .catch((error) => {
          console.error('Error generating QR code:', error);
        });
    }
  };
  
  const qrData = {...formData, id: undefined, modified: undefined};

  return (
    <div style={{display: 'flex', height: 500, justifyContent: 'center', alignItems: 'center'}}>
    <div>
      <div style={{textAlign: 'center', padding: 20}} ref={qr_ref}>
        <img src={process.env.PUBLIC_URL+"BCaribeLogo_color.png"}
        alt='logo_qr' height={80} style={{margin: -10}}/><br/>
        <QRCode value={JSON.stringify(qrData)}/>
      </div>
      <div style={{textAlign: 'center'}}>
        <label className='button' onClick={downloadQRCode}>Descargar</label>
      </div>
    </div>
    </div>);
}