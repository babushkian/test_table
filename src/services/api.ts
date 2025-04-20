// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const getRawData = (start_date: string, end_date: string) => {
  return axios.get(`${API_BASE_URL}/api/records/`, {
    withCredentials: true,
    params: {
      start_date,
      end_date,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
};
