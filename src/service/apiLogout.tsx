import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiLogout = async () => {
    const response = await apiAxios.post(`${API_URL}/api/logout`, {}, {
        withCredentials: true
    });
    const data = response.data;
    if (data.success === true) {
        return { success: true, message: data.message };
    }
    else {
        return { success: false, message: data.message };
    }
}