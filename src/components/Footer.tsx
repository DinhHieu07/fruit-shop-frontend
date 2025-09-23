import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerAddress}>
                        <div className={styles.footerAddressText}>🏠 Địa chỉ: Số 2 Văn Cao phường Nam Định, tỉnh Ninh Bình</div>
                    </div>
                    <div className={styles.footerPhone}>
                        <div className={styles.footerPhoneText}>📞 Số điện thoại: 0855491578</div>
                    </div>
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.footerEmail}>
                        <div className={styles.footerEmailText}>📧 Email: thanhhoaqua@gmail.com</div>
                    </div>
                    <div className={styles.footerFacebook}>
                        <div className={styles.footerFacebookText}>🔗 Facebook: <a href="https://www.facebook.com/thanhhoaqua" target="_blank" rel="noopener noreferrer" className={styles.footerFacebookLink}>Thanh Hoa Quả</a></div>
                    </div>
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.footerZalo}>
                        <div className={styles.footerZaloText}>📱 Zalo: 0855491578 - Thanh Hoa Quả</div>
                    </div>
                    <div className={styles.footerWebsite}>
                        <div className={styles.footerWebsiteText}>🌐 Website: <a href="https://fruit-shop-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.footerWebsiteLink}>Thanh Hoa Quả</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}