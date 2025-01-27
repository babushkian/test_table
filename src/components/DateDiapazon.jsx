import DatePickerComponent from "./DatePicker";

import { useState } from "react";

export const DateDiapazon = ({ onSubmit, setParentDates}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState("");

    function compareDates(date, otherDate, greater = true) {
        let result = null;
        if (otherDate) {
            result = greater ? date > otherDate : otherDate > date;
        }

        if (result) {
            setError("Дата окончания не может быть раньше даты начала");
        } else {
            setError("");
        }
    }

    const handleStartDate = (date) => {
        setStartDate(date);
        setParentDates({startDate: date, endDate})
        compareDates(date, endDate, true);
    };

    const handleEndDate = (date) => {
        setEndDate(date);
        setParentDates({startDate, endDate: date})
        compareDates(date, startDate, false);
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
                    {/* <DatePickerComponent selectedDate={startDate} onChange={handleStartDate} maxDate={endDate} /> */}
                    <DatePickerComponent selectedDate={startDate} onChange={handleStartDate} />
                </div>
                <div className={`date-picker-container ${error ? "error" : ""}`}>
                    <label>Окончание</label>
                    {/* <DatePickerComponent selectedDate={endDate} onChange={handleEndDate} minDate={startDate} /> */}
                    <DatePickerComponent selectedDate={endDate} onChange={handleEndDate}  />
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            {isDateRangeValid && (
                <>
                    <div className="buttons">
                        <button onClick={handleSubmit}>Показать таблицу</button>
                    </div>
                </>
            )}
        </>
    );
};
