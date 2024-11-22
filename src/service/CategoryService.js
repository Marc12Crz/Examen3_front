import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/series/api/v1/categories/';

// Obtener todas las categorías
export const getAllCategoryService = async () => {
    return await axios.get(API_URL);
};

// Crear una categoría
export const createCategoryService = async (data) => {
    return await axios.post(API_URL, data);
};

// Mostrar una categoría específica
export const showCategoryService = async (id) => {
    return await axios.get(`${API_URL}${id}/`);
};

// Actualizar una categoría
export const updateCategoryService = async (id, data) => {
    return await axios.put(`${API_URL}${id}/`, data);
};

// Eliminar una categoría
export const deleteCategoryService = async (id) => {
    return await axios.delete(`${API_URL}${id}/`);
};
