import axios from "axios";

const API_URL = "http://localhost:3001";

export const loginAdmin = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProducts = async({title, price, description, images , categoryId}:{title:string, price:number, description:string, images:string[], categoryId:number}) =>{
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.post(`${API_URL}/products`, { title, price, description, images, categoryId }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data; 
    } catch (error) {
        throw error;
    }
}