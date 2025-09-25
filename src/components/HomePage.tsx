import React, { useState, useEffect } from 'react'
import styles from "../styles/HomePage.module.css";
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import Image from 'next/image';
import { apiGetProducts } from '../service/apiProduct';

interface DecodedToken {
  role: string;
}

const HomePage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

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

  const getProducts = async () => {
    const products = await apiGetProducts();
    setProducts(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePageBanner}>
        <Image src="/banner.jpg" alt="banner" className={styles.homePageImage} fill />
      </div>
      {role === "admin" && (
        <div className={styles.adminContainer}>
          <div className={styles.adminContent}>
            <Link href="/admin/products" className={styles.adminLink}>
              <p className={styles.adminLinkText}>Quản lý sản phẩm</p>
            </Link>
          </div>
          <div className={styles.adminProductControlImageContainer}>
            <Image src="/qlsp.png" alt="admin" className={styles.adminProductControlImage} width={500} height={500} />
          </div>
        </div>
      )}
      <div className={styles.storeProductContainer}>
        <div className={styles.storeProductHeader}>
          <h1 className={styles.storeProductTitle}>Sản phẩm bán chạy</h1>
        </div>
        <div className={styles.storeProductContent}>
          {products.map((product, productIndex) => (
            product.images.map((image: string, imageIndex: number) => (
              <div key={`${productIndex}-${imageIndex}`} className={styles.storeProductItem}>
                <div className={styles.storeProductItemWrapper}>
                  <Image src={image} alt={product.name} className={styles.storeProductImage} fill />
                </div>
                <div className={styles.storeProductItemName}>{product.name}</div>
                <div className={styles.storeProductItemPrice}>{product.price} VND / kg</div>
                <div className={styles.storeProductItemDetail}>Chi tiết</div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage