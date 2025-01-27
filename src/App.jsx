// src/App.js
import { useState } from "react";

import { getRawData } from "./services/api";
import "./App.css";
import { SimpleTable } from "./components/SimpleTable";
import { DateDiapazon } from "./components/DateDiapazon";

const App = () => {
    const [dates, setDadtes] = useState(null);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const handleDatesSubmit = (data) => {
        setDadtes(data);
        handleShowTable()
    };

    async function handleShowTable() {
        setLoading(true)
        try {
            const response = await getRawData(
                dates.startDate.toISOString().split('T')[0],
                dates.endDate.toISOString().split('T')[0]
            )
            setData(response.data.data)
        } catch (err) {
            console.error('Ошибка при получении данных:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="App">
            <h1>Выберите даты для формирования отчёта</h1>
            <DateDiapazon onSubmit={handleDatesSubmit} />
            {/* {dates?  dates.map((date, index) => <p key={index}>{date}</p>): "даты отсутствуют"} */}
            {dates ? Object.keys(dates).map((d, index) => <p key={index}>{dates[d].toISOString()}</p>) : <p>даты отсутствуют</p>}

            {loading && <p>Загрузка...</p>}
            {data.length > 0 && !loading &&  <SimpleTable data={data} />} 
        </div>
    );
};

export default App;
