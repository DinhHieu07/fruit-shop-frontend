const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include",
        body: JSON.stringify({ accessToken })
    });
    const data = await response.json();
    if (data.success === true) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("fullname");
        localStorage.removeItem("user_id");
        localStorage.removeItem("avatar");
        window.location.href = "/";
    }
    else {
        alert(data.message);
        window.location.href = "/";
    }
}