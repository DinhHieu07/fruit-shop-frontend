import styles from "../styles/Header.module.css";
import { Input } from "@base-ui-components/react/input";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>🍎</div>
            <div className={styles.searchContainer}>
                <Input type="text" placeholder="Tìm kiếm sản phẩm" className={styles.searchInput} />
                <button type="submit" className={styles.searchButton}>🔍</button>
            </div>
            <div className={styles.hotLineContainer}>
                <div className={styles.hotLine}>
                    <div className={styles.hotLineIcon}>🕒</div>
                    <div className={styles.timeWork}>06:00 - 22:00</div>
                    <div className={styles.space}> | </div>
                    <div className={styles.hotLineIcon}>🔔</div>
                    <div className={styles.hotLineText}>Hotline: 0855491578</div>
                </div>
            </div>
        </div>
    )
}