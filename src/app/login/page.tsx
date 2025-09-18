"use client";
import Link from "next/link";
import styles from "../../styles/Login.module.css";
import { useState, FormEvent } from "react";
import { apiLogin } from "@/service/apiLogin";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkInfo = () => {
        if (email === "" || password === "") {
            alert("Vui lòng nhập đầy đủ thông tin");
            window.location.href = "/login";
            return false;
        }
        return true;
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        if(!checkInfo()) return;
        e.preventDefault();
        try {
            await apiLogin(email, password);
        } catch (error) {
            console.log(error);
            alert("Đăng nhập thất bại");
            window.location.href = "/login";
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginFormContainer}>
                <div className={styles.loginTitle}>Đăng nhập</div>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" className={styles.loginInput} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mật khẩu" className={styles.loginInput} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className={styles.loginButton}>Đăng nhập</button>
                </form>
                <div className={styles.loginRegisterContainer}>
                    <div className={styles.loginRegisterText}>Chưa có tài khoản? </div>
                    <Link href="/register" className={styles.loginRegisterLink}>Đăng ký</Link>
                </div>
            </div>
        </div>
    )
}
