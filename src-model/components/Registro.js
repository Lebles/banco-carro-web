import React, { useState, useEffect } from 'react';
import { Label, Input } from './Styles';
import styles from "./BoardDisplay.module.css";



export function Registro() {
    let [ registry, setRegistry ] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/api/main/entries');

        eventSource.addEventListener('update', event => {
            // console.log(JSON.parse(event.data));
            setRegistry(JSON.parse(event.data).reverse());
        });
    }, []);


    return(
        <div>
            <h1>Viendo todos los registros</h1>
            <br/>
            <div className={styles.board}>
                <label>FILTRAR POR:</label>
                <Label>Nombre:<Input type="text"/></Label>
                <Label>Fecha minima:<Input type="date"/></Label>
                <Label>Fecha maxima:<Input type="date"/></Label>
            </div>

            <br/><br/>

            <table>
                <thead>
                    <tr>
                        <th style={{width:"13ch"}}>Cedula</th>
                        <th>Nombre</th>
                        <th>Entrega</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {registry.map((each, id) =>
                        <tr key={id}>
                            <td>{each.cedula}</td>
                            <td>{each.nombre}</td>
                            <td>{each.cita}</td>
                            <td>{each.color}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* <main-table [regex]="regex" [initDate]="time1" [endDate]="time2" /> */}
        </div>
    );
}