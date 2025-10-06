import axios from "axios";
import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiLogin = async (email: string, password: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/login`, { email, password }, {
            withCredentials: true
        });
        const data = response.data;
        const userData = {
            _id: data.user_id,
            fullname: data.fullname,
            email: data.email || email,
            role: data.role || 'customer',
            avatar: data.avatar
        };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("avatar", data.avatar);
        window.location.href = "/";
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Đăng nhập thất bại";
            alert(message);
            return { success: false, message };
        } else {
            // Trường hợp lỗi không phải AxiosError
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}