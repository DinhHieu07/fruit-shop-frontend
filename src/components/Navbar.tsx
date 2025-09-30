import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
import { apiLogout } from "../service/apiLogout";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullname, setFullname] = useState<string | null>("");
    const [avatar, setAvatar] = useState<string>("");

    useEffect(() => {
        setFullname(localStorage.getItem("fullname") || "");
        setAvatar(localStorage.getItem("avatar") || "");
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={styles.navbar}>
            <h1 className={styles.logoStore} onClick={() => window.location.href = "/"}>
                <Image src="/logo.png" alt="logo" className={styles.logo} width={100} height={100} />
            </h1>
            <nav className={styles.menuContainer}>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Link href="/" className={styles.menuLink}>Sản phẩm</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/" className={styles.menuLink}>Tin tức</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/" className={styles.menuLink}>Mùa trái cây thế giới</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/" className={styles.menuLink}>Giới thiệu</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/" className={styles.menuLink}>Liên hệ</Link>
                    </li>
                </ul>
            </nav>
            <section className={styles.loginContainer}>
                {isLoggedIn ? (
                    <div className={styles.containerLogin}>
                        <div className={styles.profileContainer}>
                            <img src={avatar} alt="avatar" className={styles.profileImage} />
                            <p className={styles.profileText}>Xin chào, {fullname}</p>
                        </div>
                        <div onClick={handleLogout} className={styles.logoutText}>Đăng xuất</div>
                    </div>
                ) : (
                    <Link href="/login" className={styles.loginLink}>Đăng nhập</Link>
                )}
            </section>
        </div>
    )
}
