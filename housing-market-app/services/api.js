// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your FastAPI URL

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/your-endpoint`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Handle the error as needed
    }
};
