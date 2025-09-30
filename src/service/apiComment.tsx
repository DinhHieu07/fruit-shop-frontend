const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiHelpful = async (id: string, userId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/comment-helpful`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, userId })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Lượt thích thất bại" };
    }
}

export const apiReplyComment = async (id: string, userId: string, content: string, parentId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/comment-reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, userId, content, parentId })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Trả lời thất bại" };
    }
}

export const apiSendRating = async (id: string, userId: string, rating: number, content: string) => {
    try {
        const response = await fetch(`${API_URL}/api/comment-rating`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, userId, rating, content })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Đánh giá thất bại" };
    }
}