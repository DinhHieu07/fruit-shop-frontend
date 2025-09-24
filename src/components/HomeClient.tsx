"use client";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import { useEffect, useState } from "react";
import { apiLogout } from "../service/apiLogout";
import Footer from "./Footer";
import HomePage from "./HomePage";

export default function HomeClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState<string | null>("");

  useEffect(() => {
    setFullname(localStorage.getItem("fullname") || "");
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
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.logoStore}>
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
                <p className={styles.profileText}>Xin chào, {fullname}</p>
              </div>
              <div onClick={handleLogout} className={styles.logoutText}>Đăng xuất</div>
            </div>
          ) : (
            <Link href="/login" className={styles.loginLink}>Đăng nhập</Link>
          )}
        </section>
        {/* <HomePage /> */}
      </main>
      <Footer />
    </div>
  );
}
