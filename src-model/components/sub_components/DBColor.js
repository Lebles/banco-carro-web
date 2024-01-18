import { useEffect, useState } from "react";
import axios from 'axios';

export function SelectColor({ saveChange }) {
    const [ colors, setColors ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/main/colors')
        .then(resp => setColors(resp.data.map((each, id) => <option key={id}>{each}</option>)));
    }, []);


    return <select onChange={event => saveChange(event.target.value)}>
        <option>--------</option>
        {colors}
    </select>;
}