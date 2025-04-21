import { useEffect, useState } from "react";
import axios from "axios";

import { userActions, UserType } from "../../store/userSlice";

import { Box, Button, Container, Typography } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";

export function Login() {
  const [autorized, setAutorized] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const authContext = useAuth();
  if (!authContext) {
    throw new Error("Ошибка при авторизации");
  }
  const { login } = authContext;

  const writeTokens = (data) => {
    console.log(data);
    setAuthToken(data.access);
    setRefreshToken(data.refresh);
    localStorage.setItem("refesh", data.refresh);
    localStorage.setItem("access", data.access);
  };

  const handleLogin = async () => {
    try {
      // Отправка POST-запроса на сервер с использованием axios
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/create/",
        {
          username: "admin",
          password: "1234",
        },
      );
      // Проверка успешности логина
      if (response.data) {
        login(response.data.access);
        console.log(response.data);
        writeTokens(response.data);
        setAutorized(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleRefresh = async () => {
    try {
      // Отправка POST-запроса на сервер с использованием axios
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/refresh/",
        {
          refresh: localStorage.getItem("refesh"),
        },
      );
      writeTokens(response.data);
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  useEffect(() => {
    if (refreshToken) {
      setAutorized(true);
    } else {
      setAutorized(false);
    }
  }, [refreshToken]);

  const handleLogout = async () => {
    setAuthToken(null);
    setRefreshToken(null);
    localStorage.removeItem("refesh");
    localStorage.removeItem("access");
  };

  const label = autorized ? <div>Авторизован</div> : <div>Не авторизован</div>;

  async function getUserInfo() {
    console.log("получаем информацию о пользователе");
    const response = await axios.get<UserType>(
      "http://127.0.0.1:8000/auth/users/me/",
      {
        headers: { Authorization: `Bearer ${authToken}` },
      },
    );
    if (response.data) {
      console.log(response.data);
    }
  }

  return (
    <>
      <Container>
        <div>
          <Typography variant="h5">Login</Typography>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Box
            width={"100%"}
            height={150}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "wheat",
              flexDirection: "column",
              gap: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography variant="body1">{authToken}</Typography>
            <Typography variant="body1">{refreshToken}</Typography>
          </Box>
          <div>
            <Button variant="contained" onClick={handleLogin}>
              Залогиниться дефолтным юзером
            </Button>
          </div>
          <div>
            <button onClick={handleLogout}>Разлогиниться</button>
          </div>
          <div>
            <button onClick={handleRefresh}>Обновить токен</button>
          </div>

          <div>
            <button onClick={getUserInfo}>Сведения о пользователе</button>
          </div>
        </Box>
        {label}
      </Container>
    </>
  );
}
