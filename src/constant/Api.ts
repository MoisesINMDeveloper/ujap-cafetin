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
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${API_URL}/products`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
}
export const updateProduct = async (productId: number, { title, price, description, images, categoryId }: { title: string, price: number, description: string, images: string[], categoryId: number }) => { 
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.put(`${API_URL}/products/${productId}`, { title, price, description, images, categoryId }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteProduct = async (productId: number) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories/all-categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
}