import { XIcon } from "lucide-react";
import styles from "../styles/ResultPopup.module.css";
import { useEffect } from "react";

interface ResultpopupProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

const Resultpopup = ({ message, show, onClose }: ResultpopupProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={`${styles.popup} ${styles.show}`}>
            <p className={styles.message}>{message}</p>
            <button className={styles.closeButton} onClick={onClose} title="Đóng">
                <XIcon className={styles.closeIcon} />
            </button>
        </div>
    )
}

export default Resultpopup;