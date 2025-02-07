import { useEffect, useState, useRef } from "react";
import styles from "./EditableCell.module.css";

export function EditableCell({ getValue, row, column, table }) {
    const [editing, setEditing] = useState(false);
    // ссылка на строку ввода во время редактирования
    const inputRef = useRef(null);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
        // функция, отслеживающая что клик произошел за пределами редактируемой ячейки
        // это нужно для переключения ячейки из режима ввода в режим просмотра
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                inputRef.current.blur();
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
    }, [editing]);

    const onBlur = (event) => {
        table.options.meta?.updateData(row.index, column.id, event.target.value);
        setEditing(false);
    };
    
    const handleEnterDown = (e) => {
        if (e.key === "Enter") e.target.blur();
    };

    return editing ? (
        <div className={styles[("cell_regular", "focused")]}>
            <input
                className={styles["cell_input"]}
                ref={inputRef}
                defaultValue={getValue()}
                onBlur={onBlur}
                onKeyDown={handleEnterDown}
            />
        </div>
    ) : (
        <div className={styles["cell_regular"]} onClick={() => setEditing(true)}>
            {getValue()}
        </div>
    );
}
