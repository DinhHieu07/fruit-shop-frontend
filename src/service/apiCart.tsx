import axios from "axios";
import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiAddToCart = async (productId: string, userId: string, quantity: number) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/add-to-cart`, { productId, userId, quantity }, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Thêm vào giỏ hàng thất bại";
            return { success: false, message };
        } else {
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
};

export const apiGetCart = async () => {
    try {
        const response = await apiAxios.get(`${API_URL}/api/get-cart`, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Lấy giỏ hàng thất bại";
            return { success: false, message };
        } else {
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
};

export const apiDeleteCart = async (productId: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/delete-cart`, { productId }, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Xóa giỏ hàng thất bại";
            return { success: false, message };
        } else {
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}

export const apiDeleteCartAll = async () => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/delete-cart-all`, {}, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Xóa giỏ hàng thất bại";
            return { success: false, message };
        } else {
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}