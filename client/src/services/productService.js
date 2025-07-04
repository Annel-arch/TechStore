import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getProducts = () => axios.get(API_URL);
export const createProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
