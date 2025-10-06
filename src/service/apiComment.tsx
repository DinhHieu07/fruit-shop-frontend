import apiAxios from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiHelpful = async (id: string, userId: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/comment-helpful`, { id, userId }, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Lượt thích thất bại" };
    }
}

export const apiReplyComment = async (id: string, userId: string, content: string, parentId: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/comment-reply`, { id, userId, content, parentId }, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Trả lời thất bại" };
    }
}

export const apiSendRating = async (id: string, userId: string, rating: number, content: string) => {
    try {
        const response = await apiAxios.post(`${API_URL}/api/comment-rating`, { id, userId, rating, content }, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Đánh giá thất bại" };
    }
}