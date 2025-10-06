import axios from "axios";
import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiGoogleLogin = async (id_token: string) => {
    try {
    const response = await apiAxios.post(`${API_URL}/api/google-login`, { id_token }, {
        withCredentials: true
    });
    const data = response.data;
    if (data.success) {
        const userData = {
            _id: data.user_id,
            fullname: data.fullname,
            email: data.email,
            role: data.role,
            avatar: data.avatar
        };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("avatar", data.avatar);
        window.location.href = "/";
        } else {
            throw new Error(data.message || "Đăng nhập Google thất bại");
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Đăng nhập Google thất bại";
            alert(message);
            return { success: false, message };
        } else {
            // Trường hợp lỗi không phải AxiosError
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}



