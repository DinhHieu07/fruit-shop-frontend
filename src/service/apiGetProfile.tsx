import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiGetProfile = async () => {
    try {
        const response = await apiAxios.get(`${API_URL}/api/get-profile`, {
            withCredentials: true
        });
        const data = response.data;
        if (data.success === true) {
            return data.data;
        } else {
            return "Lấy profile thất bại";
        }
    } catch (error) {
        console.log(error);
        return "Lấy profile thất bại";
    }
}