const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiAddProduct = async (name: string, price: string, unit: string, quantity: string, dateCreate: string, category: string, image: string, note: string) => {
    try {
        console.log(name);
        const response = await fetch(`${API_URL}/api/add-product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, unit, quantity, dateCreate, category, image, note })
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
        return "Thêm sản phẩm thất bại";
    }
}

export const apiGetProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/get-products`);
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            return data.data;
        } else {
            return "Lấy sản phẩm thất bại";
        }
    } catch (error) {
        console.log(error);
        return "Lấy sản phẩm thất bại";
    }
}

export const apiDeleteProduct = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/delete-product`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
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
        return "Xóa sản phẩm thất bại";
    }
}

export const apiEditProduct = async (id: string, name: string, price: string, unit: string, quantity: string, category: string, image: string, note: string) => {
    try {
        const response = await fetch(`${API_URL}/api/edit-product`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, price, unit, quantity, category, image, note })
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
        return "Sửa sản phẩm thất bại";
    }
}