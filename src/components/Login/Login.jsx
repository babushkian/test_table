import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
export const Login = () => {
    const [autorized, setAutorized] = useState(false);

    const handleLogin = async () => {
        try {
            // Отправка POST-запроса на сервер с использованием axios
              const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: "admin",
                password: "1234",
              });

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
            // Отправка POST-запроса на сервер с использованием axios
            const response = await axios.post('http://127.0.0.1:8000/api/logout/', {});
            console.log(response.data);
            setAutorized(false);
        } catch (error) {
            console.error("Error during logging out :", error);
            alert("An error occurred during logging out.");
        }
    };

    const getPrograms = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/get_programs", {
                withCredentials: true,
                params: { start_date: "2025-02-01", end_date: "2025-02-05" },
            });

            console.log("Protected data:", response.data);
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    };

    const label = autorized ? <div>Авторизован</div> : <div>Не авторизован</div>;

    return (
        <>
            <div>
                <h2>Login</h2>
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
