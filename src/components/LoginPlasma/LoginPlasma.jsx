import { useState } from "react";
import axios from "axios";
import styles from "./LoginPlasma.module.css";
export const LoginPlasma = () => {
    const [autorized, setAutorized] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://192.168.8.163:8000/auth/login/", {
                email: "new_user@omzit.ru", //"user@omzit.ru",
                password: "StrongPass1!",
            }, {withCredentials: true});

            // Проверка успешности логина
            if (response.data) {
                setAutorized(true);
                console.log(response.data);
            } else {
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    };


    const handleLogout = async () => {
        try {
            const response = await axios.post("http://192.168.8.163:8000/auth/logout/", {}, {withCredentials: true});
            console.log(response.data);
            setAutorized(false);
        } catch (error) {
            console.error("Error during logging out :", error);
            alert("An error occurred during logging out.");
        }
    };



    const getPrograms = async () => {
        try {
            const response = await axios.get("http://192.168.8.163:8000/techman/get_programs", {
                withCredentials: true,
                params: { start_date: "2025-01-01", end_date: "2025-01-15" },
            });

            console.log("Protected data:", response.data);
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    //     fetch('http://192.168.8.163:8000/techman/get_programs?start_date=2025-02-01&end_date=2025-02-28', {
    //         method: 'GET', // или 'POST', 'PUT' и т.д.
    //         credentials: 'include', // Важно: эта опция позволяет отправлять куки
    //         headers: {
    //           'Content-Type': 'application/json',
    //           // Другие заголовки, если нужны
    //         },
    //        })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.error('Error:', error));
    };

    const label = autorized ? <div>Авторизован</div> : <div>Не авторизован</div>;

    return (
        <>
            <div>
                <h2>Логин в Плазму</h2>
            </div>
            <div className={styles["button-panel"]}>
                <div>
                    <button onClick={handleLogin}>Залогиниться дефолтным юзером</button>
                </div>
                <div>
                    <button onClick={handleLogout}>Разлогиниться</button>
                </div>

                <div>
                    <button onClick={getPrograms}>Получить данные</button>
                </div>
            </div>
            {label}
        </>
    );
};
