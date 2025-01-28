import PropTypes from 'prop-types';
import styles from "./SimpleTable.module.css"
import { useRef } from 'react';

export const SimpleTable = ({data}) => {
    const mydata = useRef(data)
    console.log("чистые данные, пришедшие в компонент таблицы", data)
    console.log("ref на данные, пришедшие в компонент таблицы", mydata)
    console.log("длина ланных", mydata.current.length)
    return (
        <table>
        <thead>
            <tr>
                {/* Генерация заголовков таблицы на основе ключей первого объекта */}
                {data.length > 0 &&
                    Object.keys(data[0]).map((key, index) => (
                        <th className={styles.th}  key={index}>{key}</th>
                    ))}
            </tr>
        </thead>
        <tbody>
            {/* Генерация строк таблицы */}
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {/* Генерация ячеек строки на основе значений объекта */}
                    {Object.values(row).map((value, cellIndex) => (
                        <td className={styles.td} key={cellIndex}>{value}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
    )
}

SimpleTable.propTypes = {data: PropTypes.array}
