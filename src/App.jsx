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
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDatesSubmit = (dates) => {
        setDates(dates);
        handleShowTable();
    };


    const setParentDates = (dates) => {setDates(dates)}

    async function handleShowTable() {
        setLoading(true);
        try {
            const response = await getRawData(convertDate(dates.startDate), convertDate(dates.endDate));
            setData(response.data);
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
            {loading && <p>Загрузка...</p>}
            {data?.data  && !loading && <TaskTable tabledata={data.data} columns={data.columns} />}
        </div>

    );
};

export default App;
