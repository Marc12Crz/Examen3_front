import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/series/api/v1/series/';

export const getAllSeries = async () => {
    return await axios.get(API_URL);
};

export const createSerieService = async (data) => {
    return await axios.post(API_URL, data);
};

export const showSerieService = async (id) => {
    return await axios.get(`${API_URL}${id}/`);
};

export const updateSerieService = async (id, data) => {
    return await axios.put(`${API_URL}${id}/`, data);
};

export const deleteSerieService = async (id) => {
    return await axios.delete(`${API_URL}${id}/`);
};
