import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiLogin = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (data.success === true) {
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("fullname", data.fullname);
            window.location.href = "/";
        } else {
            alert(data.message);
            window.location.href = "/login";
        }
    } catch (error) {
        console.log(error);
        alert("Đăng nhập thất bại");
        window.location.href = "/login";
    }
}