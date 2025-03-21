import axios from 'axios';

// const baseUrl = 'https://salone-mart.onrender.com/api/v1'
const baseUrl = 'http://localhost:8080/api/v1'
const axiosInstance = axios.create({
    baseURL: baseUrl,
});

export default axiosInstance;
