import { useEffect, useState, useRef } from "react"
import styles from "./OptionsCell.module.css"


const dropdownOptions = {1: "сделано", 2: "отменено", 3: "в процессе", 4:"ожидает"}


export function OptionsCell({getValue, row, column, table}) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue)
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null);
    
    useEffect(()=>{setValue(initialValue)}, [initialValue])

    useEffect(() => {
        if (editing && inputRef.current) {
            console.log(inputRef.current)
            inputRef.current.focus();
        }
    })

    const onChange = () =>{
        table.options.meta?.updateData(row.index, column.id, value)
        setEditing(false)
    }



    return ( editing ? (
                
                    <select className={styles["cell_select"]} 
                        ref = {inputRef}
                        
                        value = {value} 
                        onChange={onChange}
                     >
                        {Object.entries( dropdownOptions).map(([key, status]) => <option key={key} value={status} >{status}</option>)}
                    </select>
                
                ) : (
                    <div className={styles['cell_regular']}  onClick={ ()=> setEditing(true) }>{getValue()}</div>
                )

            )
}
    

