const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiAddCategory = async (name: string) => {
    try {
        console.log(name);
        const response = await fetch(`${API_URL}/api/add-category`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            return data.message;
        } else {
            return data.message;
        }
    } catch (error) {
        console.log(error);
        return "Thêm danh mục thất bại";
    }
}

export const apiGetCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/api/get-categories`);
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            return data.data;
        } else {
            return "Lấy danh mục thất bại";
        }
    } catch (error) {
        console.log(error);
        return "Lấy danh mục thất bại";
    }
}