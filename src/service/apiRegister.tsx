const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRegister = async (fullname: string, phone: string, email: string, password: string, address: string) => {
    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullname, phone, email, password, address })
        });
        const data = await response.json();

        if (data.success === true) {
            console.log(data);
            window.location.href = "/login";
        } else {
            alert(data.message);
            window.location.href = "/register";
        }
    } catch (error) {
        console.log(error);
        alert("Đăng ký thất bại");
        window.location.href = "/register";
    }
}