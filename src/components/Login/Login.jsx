import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";

export const Login = () => {
    const [autorized, setAutorized] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const handleLogin = async () => {
        try {
            // Отправка POST-запроса на сервер с использованием axios
              const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: "admin",
                password: "1234",
              });

            // Проверка успешности логина
            if (response.data) {
                console.log(response.data)
                setAutorized(true);
                setAuthToken(response.data.access);
                setRefreshToken(response.data.refresh);
                localStorage.setItem("refesh", response.data.refresh);
                localStorage.setItem("access", response.data.access);
            } else {
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    useEffect(()=>{
        if(refreshToken){
            setAutorized(true)
        } else {
            setAutorized(false)
        }
    },[refreshToken])

    const handleLogout = async () => {
        setAuthToken(null);
        setRefreshToken(null);
        localStorage.removeItem("refesh");

    };

    const getPrograms = async () => {
       let access;
        if (!authToken) {
        access = localStorage.getItem("access");
    } else {
        access = authToken
    }
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/records/", {
                withCredentials: true,
                params: { start_date: "2025-02-01", end_date: "2025-02-05" },
                headers: { Authorization: `Bearer ${access}` },
            });

            console.log("Protected data:", response.data);
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    };

    const label = autorized ? <div>Авторизован</div> : <div>Не авторизован</div>;

    async function getUserInfo() {
        const response = await axios.get("http://127.0.0.1:8000/api/show/", {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.data) {
            setUserInfo(response.data);
        }
    }

    useEffect(() => {console.log(userInfo)}, [userInfo])

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
                    <button onClick={getUserInfo}>Сведения о пользователе</button> <div>{userInfo?.user}</div> 
                </div>
                
                <div>
                    <button onClick={getPrograms}>Получить данные</button> 
                </div>
            </div>
            {label}
        </>
    );
};
