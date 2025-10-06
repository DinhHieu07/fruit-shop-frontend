import React, { useState, useEffect } from 'react'
import styles from "../styles/HomePage.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { apiGetAllProducts } from '../service/apiProduct';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  createdAt: string;
  category: string;
  images: string[];
  note: string;
  stock: number;
  updatedAt: string;
}

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const products = await apiGetAllProducts();
    setProducts(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleProductDetail = (product: Product) => {
    window.location.href = `/products/${product._id}`;
  }

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePageBanner}>
        <Image src="/banner.jpg" alt="banner" className={styles.homePageImage} fill />
      </div>
      {user?.role === "admin" && (
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
            console.log(product),
            product.images.map((image: string, imageIndex: number) => (
              <div key={`${productIndex}-${imageIndex}`} className={styles.storeProductItem}>
                <div className={styles.storeProductItemWrapper}>
                  <Image src={image} alt={product.name} className={styles.storeProductImage} fill />
                </div>
                <div className={styles.storeProductItemName}>{product.name}</div>
                <div className={styles.storeProductItemPrice}>{product.price} VND / kg</div>
                <div className={styles.storeProductItemDetail} onClick={() => handleProductDetail(product)}>Chi tiết</div>
              </div>
            ))
          ))}
        </div>
      </div>
      <div className={styles.storeBasketContainer}>
        <div className={styles.storeBasketHeader}>
          <h1 className={styles.storeBasketTitle}>Lẵng quả đẹp</h1>
        </div>
      </div>
    </div>
  )
}

export default HomePage