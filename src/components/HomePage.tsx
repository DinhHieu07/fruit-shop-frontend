import React, { useState, useEffect } from 'react'
import styles from "../styles/HomePage.module.css";
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import Image from 'next/image';

interface DecodedToken {
  role: string;
}

const HomePage = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token || "");
        setRole(decoded.role);
      } catch (error) {
        console.log("Token không hợp lệ: ", error);
      }
    }
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePageBanner}>
        <Image src="/banner.jpg" alt="banner" className={styles.homePageImage} fill/>
      </div>
      {role === "admin" && (
        <div className={styles.adminContainer}>
          <div className={styles.adminContent}>
            <Link href="/admin/products" className={styles.adminLink}>
              <p className={styles.adminLinkText}>Quản lý sản phẩm</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage