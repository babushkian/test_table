import DatePickerComponent from "./DatePicker";

import { useState } from "react";

export const DateDiapazon = ({ onSubmit }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState("");

    // //
    // const handleDatesChange = (date) => {
    //     setStartDate(date)
    //     if (endDate && date > endDate) {
    //         setError('Дата начала не может быть позже даты окончания')
    //     } else {
    //         setError('')
    //     }
    // }

    // // Проверка на корректность дат
    // const handleStartDateChange = (date) => {
    //     setStartDate(date)
    //     if (endDate && date > endDate) {
    //         setError('Дата начала не может быть позже даты окончания')
    //     } else {
    //         setError('')
    //     }
    // }

    function compareDates() {
        // if (startDate && endDate && startDate > endDate) {
        if (startDate && endDate && startDate > endDate) {
            setError("Дата окончания не может быть раньше даты начала");
        } else {
            setError("");
        }
    }
    const handleStartDate = (date) => {
        setStartDate(date);
        compareDates();
    };

    const handleEndDate = (date) => {
        setEndDate(date);
        compareDates();
    };

    const handleSubmit = () => {
        onSubmit({ startDate, endDate });
    };
    const isDateRangeValid = startDate && endDate && !error;

    return (
        <>
            <div className="input-container">
                <div className={`date-picker-container ${error ? "error" : ""}`}>
                    <label>Начало</label>
                    <DatePickerComponent selectedDate={startDate} onChange={handleStartDate} maxDate={endDate} />
                </div>
                <div className={`date-picker-container ${error ? "error" : ""}`}>
                    <label>Окончание</label>
                    <DatePickerComponent selectedDate={endDate} onChange={handleEndDate} minDate={startDate} />
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            {isDateRangeValid && (
                <>
                    <div className="buttons">
                        <button onClick={handleSubmit}>Показать таблицу</button>
                    </div>
                </>)
            }
        </>
    );
};
