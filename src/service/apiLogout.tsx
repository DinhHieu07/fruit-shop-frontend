import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiLogout = async () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const response = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ accessToken, refreshToken })
    });
    const data = await response.json();
    if (data.success === true) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        localStorage.removeItem("fullname");
        window.location.href = "/";
    }
    else {
        alert(data.message);
        window.location.href = "/";
    }
}