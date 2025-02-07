import { useEffect, useState, useRef } from "react"
import styles from "./OptionsCell.module.css"


const dropdownOptions = ["сделано", "отменено", "в процессе", "ожидает"]


export function OptionsCell({getValue, row, column, table}) {

    const [editing, setEditing] = useState(false)
    const selectRef = useRef(null);
    

    useEffect(() => {
        if (editing && selectRef.current) {
            selectRef.current.focus();

        }

        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                onChange(event)
            }
        };
        // создается глобальный слушатель кликов мышкой когда ячейка входит в режим редактирования
        if (editing) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        // очистка слушателя при перед следующим запуском  useEffect
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [editing])

    const onChange = (event) =>{
        const odlValue=getValue()
        table.options.meta?.updateData(row.index, column.id, event.target.value ?? odlValue)
        setEditing(false)
    }



    return ( editing ? (
                
                    <select className={styles["cell_select"]} 
                        ref = {selectRef}
                        defaultValue = {getValue()} 
                        onChange={onChange}
                     >
                        {dropdownOptions.map((status, index) => <option key={index} value={status} >{status}</option>)}
                    </select>
                
                ) : (
                    <div className={styles['cell_regular']}  onClick={ ()=> setEditing(true) }>{getValue()}</div>
                )

            )
}
    

