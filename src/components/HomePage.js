import UIPage from "./UIPage";

export default function HomePage() {
    return(<UIPage>
    <div style={{flex: 1}}>
        <img src={process.env.PUBLIC_URL+"fondoHome.png"}
        alt='fondo' style={{width: '100%'}}/>
    </div>
    </UIPage>);
}