import React, { useState, useEffect } from "react";
import { apiClient } from "../utils/urls";
import { AuthContext } from "../hooks/use-auth";

import { UserType } from "../store/userSlice";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null"),
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log("обновление токена");
      fetchCurrentUser(); // Загружаем данные пользователя
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await apiClient.get("/auth/users/me/");
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error);
      logout(); // если не удалось получить пользователя — разлогиниваем
    }
  };

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
