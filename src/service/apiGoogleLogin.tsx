const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiGoogleLogin = async (id_token: string) => {
    const response = await fetch(`${API_URL}/api/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id_token })
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("avatar", data.avatar);
        window.location.href = "/";
    } else {
        throw new Error(data.message || "Đăng nhập Google thất bại");
    }
}



