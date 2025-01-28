// src/App.js
import { useEffect, useState } from "react";

import "./App.css";

import { getRawData } from "./services/api";
import { SimpleTable } from "./components/SimpleTable/SimpleTable";
import { TaskTable } from "./components/TaskTable/TaskTable";
import { DateDiapazon } from "./components/DateDiapazon";
import { convertDate } from "./services/convertDate";

const App = () => {
    const [dates, setDates] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDatesSubmit = (dates) => {
        setDates(dates);
        handleShowTable();
    };
    useEffect(() =>{
        if (loading === false ) {
            console.log("Состояние загрузки:", loading)
        }
    },
    [loading])

    const setParentDates = (dates) => {setDates(dates)}

    async function handleShowTable() {
        setLoading(true);
        try {
            const response = await getRawData(convertDate(dates.startDate), convertDate(dates.endDate));
            setData(response.data.data);
        } catch (err) {
            console.error("Ошибка при получении данных:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="App">
            <h1>Выберите даты для формирования отчёта</h1>
            <DateDiapazon onSubmit={handleDatesSubmit} setParentDates={setParentDates}/>
            {/* {dates?  dates.map((date, index) => <p key={index}>{date}</p>): "даты отсутствуют"} */}
            {dates ? (
                Object.keys(dates).map((d, index) => <p key={index}>{dates[d]? convertDate(dates[d]): ""}</p>)
            ) : (
                <p>даты отсутствуют</p>
            )}

            {loading && <p>Загрузка...</p>}
            {/* {data.length > 0 && !loading && <SimpleTable data={data} />} */}
            {data.length > 0 && !loading && <TaskTable DATA={data} />}
        </div>
    );
};

export default App;
