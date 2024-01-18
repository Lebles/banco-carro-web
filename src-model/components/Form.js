import { useRef, useState } from "react";
import styles from "./BoardDisplay.module.css";
import { Label } from "./Styles";
import { FormattedInput } from "./sub_components/MyInput";
import { SelectColor } from "./sub_components/DBColor";
import axios from "axios";

export function Form() {
    //#region binding
    const cedula = useRef("");
    const telefono = useRef("");

    const email = useRef("");
    const cita = useRef("");
    const color = useRef("----");

    function getMyVal(ref) {
        return val => ref.current = val
    }
    function getValue(ref) {
        return event => {
            ref.current = event.target.value;
        };
    }
    //#endregion binding

    const [ data, setData ] = useState(null);

    function checkPadron() {
// http://172.24.125.80:8088/fermat/checkPadron.jsp
        if (cedula.current.length < 13 ||
            telefono.current.length < 12 ||
            email.current.length === 0 ||
            cita.current.length === 0 ||
            color.current.includes("---")) {
                setData("No se ha completado el formulario adecuadamente"); console.log(color.current);
                return;
        }

        axios.post("http://localhost:8080/api/main/padron",
        cedula.current) // 001-0323059-5 (el ejemplos) // mia: 402-3034042-0 // madre: 002-0007210-6
        .then((response_data) => setData(response_data.data));
    }

    function summit() {
        axios.post('http://localhost:8080/api/main/entry', { 
        cedula: cedula.current, 
        nombre: data.nombre + " " + data.apellido, 
        cita: cita.current, 
        telefono: telefono.current, 
        email: email.current,
        color: color.current})
        .then(resp => {
            setData(null);
            console.log(resp);
        });
    }

    const dial = typeof data === 'string' || data instanceof String;
    return (
        <div>
            <h1>Inscripcion</h1>
            <p>Para inscribirte, completa el siguiente formulario:</p>

            <div className={styles.board}>
                <Label>Cedula: <FormattedInput saveChange={getMyVal(cedula)}/></Label>
                <Label>Email: <input type="email" placeholder="usted@email.com" onChange={getValue(email)}/></Label>
                <Label>Telefono: <FormattedInput pattern="XXX-XXX-XXXX" saveChange={getMyVal(telefono)}/></Label>
                <Label>Cita: <input type="date" onChange={getValue(cita)}/></Label>
                <Label>Acceso: <SelectColor saveChange={getMyVal(color)}/></Label>
                <button onClick={checkPadron}>Cargar</button>
            </div>

            <br/>
            {dial ? <label style={{backgroundColor: "#f005", color: "#d00", padding: 5}}>{data}</label> : null}
            {data !== null && !dial ? <div className={styles.display}>
                <img src={"data:image/jpeg;base64,"+data.foto} width={256} />
                <div style={{flex: 1}}>
                    <label>Nombre: {data.nombre}</label>
                    <label>Apellido: {data.apellido}</label>
                    <label>Telefono: {telefono.current}</label>
                </div>
                <div style={{flex: 1}}>
                    <label>Email: {email.current}</label>
                    <label>Cita: {cita.current}</label>
                    <label>Access: {color.current}</label>
                </div>
            </div> : null }
            {data !== null && !dial ? <button onClick={summit}>Enviar</button> : null}
        </div>
    );
}