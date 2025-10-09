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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [sex, setSex] = useState("");

    const checkInfo = () => {
        const phoneRegex = new RegExp("^0[0-9]{9}$");
        const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
        if (fullname === "" || phone === "" || email === "" || password === "" || address === "" || confirmPassword === "" || birthdate === "" || sex === "") {
            alert("Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        else if (!emailRegex.test(email)) {
            alert("Vui lòng nhập đúng định dạng email (ví dụ: abc@gmail.com)");
            return false;
        }
        else if (!phoneRegex.test(phone)) {
            alert("Vui lòng nhập đúng định dạng số điện thoại (10 chữ số, bắt đầu bằng 0)");
            return false;
        }
        else if (password !== confirmPassword) {
            alert("Mật khẩu và nhập lại mật khẩu không khớp");
            return false;
        }
        else if (birthdate === "") {
            alert("Vui lòng nhập ngày sinh");
            return false;
        }
        else if (sex === "") {
            alert("Vui lòng chọn giới tính");
            return false;
        }
        return true;
    }

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkInfo()) return;
        try {
            await apiRegister(fullname, phone, email, password, address, birthdate, sex);
        } catch (error) {
            console.log(error);
            alert("Đăng ký thất bại");
        }
    }

    return (
        <section className={styles.registerContainer}>
            <div className={styles.registerFormContainer}>
                <h2 className={styles.registerTitle}>Đăng ký</h2>
                <form className={styles.registerForm} onSubmit={handleRegister}>
                    <input type="text" placeholder="Họ và tên" className={styles.registerInput} value={fullname} onChange={(e) => setFullname(e.target.value)} required/>
                    <input type="text" placeholder="Số điện thoại" className={styles.registerInput} value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                    <input type="text" placeholder="Email" className={styles.registerInput} value={email} onChange={(e) => setEmail(e.target.value)} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="Vui lòng nhập định dạng email hợp lệ (ví dụ: abc@gmail.com)"/>
                    <input type="date" title="Ngày sinh" className={styles.registerInput} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required/>
                    <select title="Giới tính" className={styles.registerInputSex} value={sex} onChange={(e) => setSex(e.target.value)} required>
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                        <option value="khác">Khác</option>
                    </select>
                    <input type="password" placeholder="Mật khẩu" className={styles.registerInput} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <input type="password" placeholder="Nhập lại mật khẩu" className={styles.registerInput} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <input type="text" placeholder="Địa chỉ" className={styles.registerInput} value={address} onChange={(e) => setAddress(e.target.value)} required/>
                    <button type="submit" className={styles.registerButton}>Đăng ký</button>
                </form>
                <div className={styles.registerLoginContainer}>
                    <p className={styles.registerLoginText}>Đã có tài khoản? </p>
                    <Link href="/login" className={styles.registerLoginLink}>Đăng nhập</Link>
                </div>
            </div>
        </section>
    )
}
