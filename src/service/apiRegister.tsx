import axios from "axios";
import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRegister = async (fullname: string, phone: string, email: string, password: string, address: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/register`, { fullname, phone, email, password, address }, {
            withCredentials: true
        });
        const data = response.data;

        if (data.success === true) {
            window.location.href = "/login";
            return data;
        } else {
            return { success: false, message: data.message };
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Đăng ký thất bại";
            alert(message);
            return { success: false, message };
        } else {
            // Trường hợp lỗi không phải AxiosError
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}