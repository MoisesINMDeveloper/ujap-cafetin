import axios from "axios";

const API_URL = "https://ujap-cafetin-server-production.up.railway.app";

//--Servicios de Usuarios--//
export const loginAdmin = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//--Servicios de Productos--//
export const getProducts = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createProducts = async ({
  title,
  price,
  description,
  images,
  categoryId,
}: {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/products`,
      { title, price, description, images, categoryId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  productId: number,
  {
    title,
    price,
    description,
    images,
    categoryId,
  }: {
    title: string;
    price: number;
    description: string;
    images: string[];
    categoryId: number;
  }
) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/products/${productId}`,
      { title, price, description, images, categoryId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteProduct = async (productId: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//--Servicios de Categorias--//
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories/all-categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/categories`,
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCategory = async (categoryId: number, name: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/categories/${categoryId}`,
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteCategory = async (categoryId: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//--Servicios de Delivery--//
export const getDeliveryOptions = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/delivery`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createDeliveryOption = async ({
  name,
  fee,
}: {
  name: string;
  fee: number;
}) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/delivery`,
      { name, fee },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateDeliveryOption = async (
  deliveryId: number,
  name: string,
  fee: number
) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/delivery/${deliveryId}`,
      { name, fee },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteDeliveryOption = async (deliveryId: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/delivery/${deliveryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//--Servicios de PagoMoviles--//
export const getPaymentOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/paydates`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createPaymentOption = async ({
  bank,
  code,
  cedula,
  phone,
}: {
  bank: string;
  code: string;
  cedula: string;
  phone: string;
}) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/paydates`,
      { bank, code, cedula, phone },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updatePaymentOption = async (
  paymentId: number,
  bank: string,
  code: string,
  cedula: string,
  phone: string
) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/paydates/${paymentId}`,
      { bank, code, cedula, phone },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deletePaymentOption = async (paymentId: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/paydates/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
