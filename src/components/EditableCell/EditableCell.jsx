import { useEffect, useState, useRef } from "react";
import styles from "./EditableCell.module.css";

export function EditableCell({ getValue, row, column, table }) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
        // функция, отслеживающая что клик произошел за пределами редактируемой ячейки
        // это нужно для переключения ячейки из режима ввода в режим просмотра
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                onBlur();
            }
        };
        // создается глобальный слушатель кликов мышкой
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editing]);

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value);
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
                value={value}
                onBlur={onBlur}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleEnterDown}
            />
        </div>
    ) : (
        <div className={styles["cell_regular"]} onClick={() => setEditing(true)}>
            {getValue()}
        </div>
    );
}
