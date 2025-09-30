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
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("avatar", data.avatar);
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error);
        alert("Đăng nhập thất bại");
    }
}