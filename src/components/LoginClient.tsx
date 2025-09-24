"use client";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useState, FormEvent } from "react";
import { apiLogin } from "../service/apiLogin";
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";
import { apiGoogleLogin } from "../service/apiGoogleLogin";

export default function LoginClient() {
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
        if (!checkInfo()) return;
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
                <h1 className={styles.loginTitle}>Đăng nhập</h1>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <div className={styles.loginFormGroup}>
                        <label htmlFor="email" className={styles.loginLabel}>Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            className={styles.loginInput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            id="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            title="Vui lòng nhập định dạng email hợp lệ (ví dụ: abc@gmail.com)"
                        />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <label htmlFor="password" className={styles.loginLabel}>Password</label>
                        <input type="password" placeholder="Mật khẩu" className={styles.loginInput} value={password} onChange={(e) => setPassword(e.target.value)} required id="password" />
                    </div>
                    <button type="submit" className={styles.loginButton}>Đăng nhập</button>
                </form>
                <p className={styles.loginOrText}>Hoặc</p>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                    <div className={styles.loginGoogleContainer}>
                        <GoogleLogin
                            onSuccess={async (credentialResponse: CredentialResponse) => {
                                try {
                                    const id_token = credentialResponse.credential as string;
                                    await apiGoogleLogin(id_token);
                                } catch (err) {
                                    alert("Đăng nhập Google thất bại");
                                }
                            }}
                            onError={() => {
                                alert("Đăng nhập Google thất bại");
                            }}
                            useOneTap
                            size="large"
                            shape="pill"
                            text="signin_with"
                        />
                    </div>
                </GoogleOAuthProvider>
                <div className={styles.loginRegisterContainer}>
                    <p className={styles.loginRegisterText}>Bạn chưa có tài khoản? </p>
                    <Link href="/register" className={styles.loginRegisterLink}>Đăng ký</Link>
                </div>
            </div>
        </div>
    )
}
