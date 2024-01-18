import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import UIPage from './UIPage';

export default function ListPage() {
    const [ rowData, setRowData ] = useState([]);

    const [ menu, setMenu ] = useState({visible: 'none', x: 0, y: 0, id: -1});

    useEffect(() => {
        axios.get('http://localhost:8080/api/main/carro/lista')
        .then(r => setRowData(r.data.reverse()));
    }, []);

    const colDefs = [
        { field: "marca" },
        { field: "modelo" },
        { field: "submodelo" },
        { field: "tipo" },
        { field: "anno", headerName: 'Año' },
        { field: "valor" },
        { field: "condicion" },
        { field: "id", headerName: '', maxWidth: 100, cellRenderer: ({value}) => {
            return (<label className='hoverobscure' style={{fontSize: 32,
            lineHeight: 1}} onClick={() => setMenu({visible: 'flex', x: menu.x, y: menu.y, id: value})}>
            &#8901;&#8901;&#8901;</label>);
        }},
    ];

    function handleMaintain(id) {
        sessionStorage.setItem("to_main", id === undefined ? -1 : id);
        window.location.assign('/main');
    }

    function handleQR() {
        if (!menu.id) return;
        sessionStorage.setItem("to_main", menu.id);
        sessionStorage.setItem("qr_direct", 'true');
        window.location.assign('/main');
    }

    return (<UIPage>
    <div className='newdrop' style={{position: 'absolute', width: 108, backgroundColor: '#f5f5f5',
    zIndex: 1, flexDirection: 'column', display: menu.visible, top: menu.y - 90, left: menu.x - 105}}
    onMouseLeave={() => setMenu({visible: 'none', x: menu.x, y: menu.y})}>
        <label onClick={() => axios.delete('http://localhost:8080/api/main/carro/'
        +menu.id+'/delete').then(r => window.location.assign('/list'))}>Borrar</label>
        <label onClick={handleQR}>Generar QR</label>
        <label onClick={() => handleMaintain(menu.id)}>Editar</label>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}
    onMouseMove={e => {menu.x = e.clientX; menu.y = e.clientY;}}>
        <div><label className='button' style={{flexGrow: 0}}
        onClick={() => handleMaintain()}>Agregar</label></div>
        <div className="ag-theme-quartz" style={{flex: 1}}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={{ resizable: false }}
            autoSizeStrategy={{type: 'fitGridWidth'}} suppressMovableColumns={true}
            suppressHorizontalScroll={true} />
        </div>
    </div>
    </UIPage>);
}

// function ButtonCellRenderer({ value, data }) {
//     // data es toda la data del row

//     return ();
// }