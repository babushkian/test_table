import PropTypes from 'prop-types';

export const SimpleTable = ({data}) => {
    return (
        <table>
        <thead>
            <tr>
                {/* Генерация заголовков таблицы на основе ключей первого объекта */}
                {data.length > 0 &&
                    Object.keys(data[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
            </tr>
        </thead>
        <tbody>
            {/* Генерация строк таблицы */}
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {/* Генерация ячеек строки на основе значений объекта */}
                    {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex}>{value}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
    )
}

SimpleTable.propTypes = {data: PropTypes.array}
