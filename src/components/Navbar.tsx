import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
import { apiLogout } from "../service/apiLogout";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiGetProfile } from "../service/apiGetProfile";

interface User {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    avatar: string;
    phone?: string;
    address?: string;
    sex?: string;
    birthdate?: string;
}

export default function Navbar() {
    const {isAuthenticated, logout } = useAuth();
    const [isProfilePopup, setIsProfilePopup] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [fullname, setFullname] = useState("");
    const [user, setUser] = useState<User | null>(null);

    const handleLogout = async () => {
        try {
            const result = await apiLogout();
            if (result.success) {
                logout(); // Gọi logout từ context
                window.location.href = "/";
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
            // Vẫn logout ngay cả khi API thất bại
            logout();
            window.location.href = "/";
        }
    }

    const handleProfilePopup = () => {
        setIsProfilePopup(!isProfilePopup);
    }

    const handleProfile = () => {
        window.location.href = "/profile";
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await apiGetProfile();
            console.log(result);
            setUser(result);
        }
        fetchProfile();
    }, []);

    useEffect(() => {
        setAvatar(user?.avatar || "");
        setFullname(user?.fullname || "");
    }, [user]);

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
                {isAuthenticated ? (
                    <div className={styles.containerLogin}>
                        <div className={styles.profileContainer}>
                            <img src={avatar || user?.avatar} alt="avatar" className={styles.profileImage} />
                            <p className={styles.profileText} onClick={handleProfilePopup}>Xin chào, {fullname}</p>
                        </div>
                        {isProfilePopup && (
                            <div className={styles.profilePopup}>
                                <button onClick={handleProfile}>Quản lý tài khoản</button> 
                                <button onClick={handleLogout}>Đăng xuất</button>                  
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/login" className={styles.loginLink}>Đăng nhập</Link>
                )}
            </section>
        </div>
    )
}
