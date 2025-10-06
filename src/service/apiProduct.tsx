import axios from "axios";
import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiAddProduct = async (name: string, price: string, unit: string, quantity: string, dateCreate: string, category: string, image: string, note: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/add-product`, { name, price, unit, quantity, dateCreate, category, image, note }, {
            withCredentials: true
        });
        const data = response.data;
        console.log(data);
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Thêm sản phẩm thất bại";
            console.error("Add product error", { status, message, detail: error.response?.data });
            return { success: false, message };
        } else {
            // Trường hợp lỗi không phải AxiosError
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}

export const apiGetAllProducts = async () => {
    try {
        const response = await apiAxios.get(`${API_URL}/api/get-all-products`, {
            withCredentials: true
        });
        const data = response.data;
        if (data.success === true) {
            return data.data;
        } else {
            return "Lấy sản phẩm thất bại";
        }
    } catch (error) {
        console.log(error);
        return "Lấy sản phẩm thất bại";
    }
}

export const apiGetProduct = async (id: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/get-product`, { id }, {
            withCredentials: true
        });
        const data = response.data;
        return data.data;
    } catch (error) {
        console.log(error);
        return "Lấy sản phẩm thất bại";
    }
}

export const apiDeleteProduct = async (id: string) => {
    try {
        const response = await apiAxios.delete(`${API_URL}/api/delete-product`, {
            data: { id },
            withCredentials: true
        });
        const data = response.data;
        if (data.success === true) {
            return data.message;
        } else {
            return data.message;
        }
    } catch (error) {
        console.log(error);
        return "Xóa sản phẩm thất bại";
    }
}

export const apiEditProduct = async (id: string, name: string, price: string, unit: string, quantity: string, category: string, image: string, note: string) => {
    try {
        const response = await apiAxios.patch(`${API_URL}/api/edit-product`, { id, name, price, unit, quantity, category, image, note }, {
            withCredentials: true
        });
        const data = response.data;
        if (data.success === true) {
            return data.message;
        } else {
            return data.message;
        }
    } catch (error) {
        console.log(error);
        return "Sửa sản phẩm thất bại";
    }
}

export const apiGetComments = async (productId: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/get-comments`, { productId }, {
            withCredentials: true
        });
        const data = response.data;
        return data.data;
    } catch (error) {
        console.log(error);
        return "Lấy bình luận thất bại";
    }
}