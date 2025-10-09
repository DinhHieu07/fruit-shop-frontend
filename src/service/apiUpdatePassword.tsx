import axios from "axios";
import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiUpdatePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/update-password`, { oldPassword, newPassword }, {
            withCredentials: true
        });
        const data = response.data;
        if (data.success === true) {
            return data;
        } else {
            return { success: false, message: data.message };
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Cập nhật mật khẩu thất bại";
            return { success: false, message };
        } else {
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}   