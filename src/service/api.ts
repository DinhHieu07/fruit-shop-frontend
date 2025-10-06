import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

apiAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error?.response?.status;
        const message = error?.response?.data?.message;

        const isAuthError = status === 401 && [
            "Token đã hết hạn, vui lòng đăng nhập lại",
            "Vui lòng đăng nhập để tiếp tục",
            "Token không hợp lệ"
        ].includes(message);

        // Tránh lặp vô hạn và không tự refresh cho chính yêu cầu refresh-token
        const isRefreshCall = originalRequest?.url?.includes('/api/refresh-token');
        const isGetProfile = originalRequest?.url?.includes('/api/get-profile');

        // Không tự refresh cho get-profile (tránh vòng lặp khởi động)
        if (isAuthError && !originalRequest._retry && !isRefreshCall && !isGetProfile) {
            originalRequest._retry = true;
            try {
                // Dùng axios gốc để tránh interceptor của chính nó
                await axios.post(`${API_URL}/api/refresh-token`, {}, { withCredentials: true });
                return apiAxios(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token thất bại:", refreshError);
                if (typeof window !== 'undefined') window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiAxios;