import axios from "axios";
import { getTokenFromStore, clearStore } from "./local-storage";

import { NavigateFunction } from "react-router";

const BASE_URL = "http://127.0.0.1:8000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

let navigateFunction: NavigateFunction | null = null;

export const setupInterceptors = (navigate?: NavigateFunction) => {
  if (navigate) {
    navigateFunction = navigate;
  }
  apiClient.interceptors.request.use(
    (config) => {
      console.log("получаем токен");
      const token = getTokenFromStore();
      console.log("токен", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Токен недействителен или истек
      if (error.response && error.response.status === 401) {
        clearStore(); // Удаляем токен из хранилища
        if (navigateFunction) navigateFunction("/login"); // Перенаправляем пользователя на страницу логина
      }
      return Promise.reject(error);
    },
  );
};
