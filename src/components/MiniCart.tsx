import { Button } from "@mui/material";
import styles from "../styles/MiniCart.module.css";
import { useEffect, useState } from "react";

export default function MiniCart({ items }: { items: { _id: string, name: string, price: number, quantity: number, images: string }[] }) {
    const [priceEachProduct, setPriceEachProduct] = useState<number[]>([]);
    useEffect(() => {
        setPriceEachProduct(items.map((item) => item.price * item.quantity));
    }, [items]);
    const handleViewAll = () => {
        window.location.href = "/cart";
    }

    return (
        <div className={styles.miniCartContainer}>
            <h1 className={styles.miniCartTitle}>Sản phẩm mới thêm</h1>
            {
                items.length === 0 ? (
                    <p className={styles.miniCartEmpty}>Chưa có sản phẩm nào</p>
                ) : (
                    <div className={styles.miniCartContent}>
                        <ul className={styles.miniCartList}>
                            {items.map((item, index) => (
                                <li key={item._id} className={styles.miniCartItem}>
                                    <img src={item.images} alt={item.name} className={styles.miniCartItemImage} />
                                    <div className={styles.miniCartItemContent}>
                                        <p className={styles.miniCartItemContentName}>{item.name}</p>
                                        <span className={styles.miniCartItemContentPrice}>{priceEachProduct[index]} VND</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.miniCartButton}>
                            <span className={styles.miniCartButtonText}>Đã thêm {items.length} sản phẩm</span>
                            <Button className={styles.miniCartButtonViewAll} variant="outlined" sx={{ borderColor: "#4CAF50", color: "#4CAF50" }} onClick={handleViewAll}>Xem giỏ hàng</Button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
