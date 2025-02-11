// src/services/api.js
import axios from 'axios'
axios
const API_BASE_URL = 'http://127.0.0.1:8000' // замените на URL вашего backend API

export const getRawData = (start_date, end_date) => {
    return axios.get(`${API_BASE_URL}/api/records/`, {
        withCredentials: true,
        params: {
            start_date,
            end_date,
        },
    })
}

export const downloadExcel = (start_date, end_date) => {
    return axios.get(`${API_BASE_URL}/download_excel`, {
        withCredentials: true,
        params: {
            start_date,
            end_date,
        },
        responseType: 'blob', // для загрузки Excel файла
    })
}
