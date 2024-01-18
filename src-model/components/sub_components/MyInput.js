import { useMemo } from "react";

export function FormattedInput({ pattern = "XXX-XXXXXXX-X", saveChange }) {
    const separator = useMemo(() => {
        let sep = [];
        let sep_i = pattern.indexOf("-", 0);
        while(sep_i > 0) {
            sep.push(sep_i);
            sep_i = pattern.indexOf("-", sep_i+1);
        }
        return sep;
    }, [pattern]);

    function checkInput(event) {
        if (!event.target.value) return;
        let val = event.target.value.replaceAll(/\D/g, "");

        // preambulo
        if (event.nativeEvent.data === null) {
            for (let n of separator) {
                if (event.target.value.length === n) {
                    val = val.substring(0,n-(separator.indexOf(n)+1));
                    break;
                }
            }
        }
        
        // formateo
        for (let n of separator)
            if (val.length > n) val = insert(val, "-", n); // 123-1234567-1

        if (separator.find(each => each === val.length) !== undefined) val += "-";
        
        event.target.value = val;
        saveChange(val);
    }
    function maxCapasity(e) {
        if (e.target.value.length >= pattern.length && e.nativeEvent.data !== null)
        e.target.value = e.target.value.substring(0,pattern.length-1)
    }


    return <input type="text" onInput={checkInput} onBeforeInput={maxCapasity} placeholder={pattern}
                  style={{fontFamily: "monospace", width: pattern.length+"ch"}}/>;
}

function insert(str, char, index) {
  return str.substring(0, index) + char + str.substring(index);
}

/* function printObject(obj) {
    let str = obj+"\n";
    for (let e in obj) {
        str += e + " : " + obj[e] + "\n";
    }
    console.log(str);
} */