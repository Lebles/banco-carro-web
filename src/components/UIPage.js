export default function UIPage({children}) {

    return (<div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
    <div style={{backgroundColor: '#eee', display: 'flex'}}>
        <img src={process.env.PUBLIC_URL+"BCaribeLogo_color.png"}
        alt='logo' height={60} style={{margin: -10}}/>
        <i className='icon icon-navigation' style={{margin: 8, color: '#006647'}}></i>

        <span style={{flex: 1}}></span>
        <div className='flip'>
            <label style={{marginRight: 8}}>RM003260</label>
            <i className='icon icon-user'></i>
        </div>
    </div>
    <div style={{display: 'flex', flexGrow: 1}}>
        <div className='option-bar' style={{color: 'white'}}>
            <span style={{backgroundColor: '#0003'}}><strong>Opciones</strong></span>
            
            <label onClick={() => window.location.assign('/home')}>
            <i className='icon icon-home'></i> Home</label>
            <label onClick={() => window.location.assign('/list')}>
            <i className='icon icon-wrench'></i> Mantenimiento</label>

            <label><i className='icon icon-document'></i> Reporte</label>
            <label><i className='icon icon-gear'></i> Configuracion</label>
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <div style={{flex: 1}}>{children}</div>
            <label style={{backgroundColor: '#eee', textAlign: 'end', padding: 10}}>Banco Caribe &#169; 2023</label>
        </div>
    </div></div>);
}