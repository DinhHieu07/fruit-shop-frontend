"use client";
import Link from "next/link";
import styles from "../styles/Register.module.css";
import { useState, FormEvent } from "react";
import { apiRegister } from "../service/apiRegister";

export default function RegisterClient() {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            await apiRegister(fullname, phone, email, password, address);
        } catch (error) {
            console.log(error);
            alert("Đăng ký thất bại");
            window.location.href = "/register";
        }
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerFormContainer}>
                <div className={styles.registerTitle}>Đăng ký</div>
                <form className={styles.registerForm} onSubmit={handleRegister}>
                    <input type="text" placeholder="Họ và tên" className={styles.registerInput} value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    <input type="text" placeholder="Số điện thoại" className={styles.registerInput} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type="text" placeholder="Email" className={styles.registerInput} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mật khẩu" className={styles.registerInput} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Địa chỉ" className={styles.registerInput} value={address} onChange={(e) => setAddress(e.target.value)} />
                    <button type="submit" className={styles.registerButton}>Đăng ký</button>
                </form>
                <div className={styles.registerLoginContainer}>
                    <div className={styles.registerLoginText}>Đã có tài khoản? </div>
                    <Link href="/login" className={styles.registerLoginLink}>Đăng nhập</Link>
                </div>
            </div>
        </div>
    )
}
