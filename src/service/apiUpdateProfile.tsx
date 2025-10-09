import axios from "axios";
import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiUpdateProfile = async (fullname: string, phone: string, address: string, birthdate: string, sex: string) => {
    try {
        const response = await apiAxios.put(`${API_URL}/api/update-profile`, {
            fullname,
            phone,
            address,
            birthdate,
            sex
        }, {
            withCredentials: true
        });
        const data = response.data;
        if (data.success === true) {
            return data;
        } else {
            return { success: false, message: data.message || "Cập nhật profile thất bại" };
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Cập nhật profile thất bại";
            return { success: false, message };
        } else {
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}

export const apiUpdateAvatar = async (avatar: File | null) => {
    try {
        if (!avatar) return { success: false, message: "Không có file để tải lên" };
        const formData = new FormData();
        formData.append("avatar", avatar);

        const response = await apiAxios.post(`${API_URL}/api/update-avatar`, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        const data = response.data;
        if (data.success === true) {
            return data;
        } else {
            return { success: false, message: data.message || "Cập nhật avatar thất bại"};
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Cập nhật avatar thất bại";
            return { success: false, message };
        } else {
            return { success: false, message: "Đã xảy ra lỗi không xác định" };
        }
    }
}
