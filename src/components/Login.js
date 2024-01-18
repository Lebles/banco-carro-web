import style from "./GeneralStyle.ts";

export default function LoginPage() {
    return (<div style={{...style.centrar, backgroundColor: '#006647', flexDirection: 'column'}}>
        <div style={{flex: 1}}></div>
        <img src={process.env.PUBLIC_URL+"BCaribeLogo_blanco.png"}
        alt='logo' height={128} style={{flexGrow: 0}}/>
        <div style={{padding: 30, borderRadius: 10, backgroundColor: 'white' }}>
            <h3 style={{margin: 10}}>Iniciar Sesión</h3>
            <input type="text" style={style.input_text} placeholder="Nombre de Usuario"/><br/>
            <input type='password' style={style.input_text} placeholder="Contraseña"/><br/>

            <button style={{...style.input_text, backgroundColor: '#006647', color: 'white',
            marginTop: 20}} onClick={() => window.location.assign('/home')}>Acceder</button>
        </div>
        <div style={{flex: 2}}></div>
    </div>);
}