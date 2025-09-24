"use client";
import { useState } from "react";
import styles from "../styles/AdminProduct.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import { PlusIcon, SearchIcon, XIcon } from "lucide-react";

export default function AdminProduct() {
    const [isAddProduct, setIsAddProduct] = useState(false);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const handleAddProduct = () => {
        setIsAddProduct(true);
    }
    const handleCloseAddProduct = () => {
        setIsAddProduct(false);
    }
    const handleAddCategory = () => {
        setIsAddCategory(true);
    }
    const handleCloseAddCategory = () => {
        setIsAddCategory(false);
    }
    return (
        <div className={styles.adminProductContainer}>
            <Header />
            <Navbar />
            <main className={styles.adminProductMain}>
                <div className={styles.adminProductContentContainer}>
                    <div className={styles.adminProductContent}>
                        <h1 className={styles.adminProductTitle}>Quản lý Sản phẩm</h1>
                        <p className={styles.adminProductDescription}>Quản lý danh mục sản phẩm của cửa hàng</p>
                    </div>
                    <div className={styles.adminProductButtonContainer}>
                        <button className={styles.adminProductButton} onClick={handleAddCategory}>
                            <PlusIcon className={styles.adminProductButtonIcon} />
                            Thêm danh mục
                        </button>
                    </div>
                    <div className={styles.adminProductButtonContainer}>
                        <button className={styles.adminProductButton} onClick={handleAddProduct}>
                            <PlusIcon className={styles.adminProductButtonIcon} />
                            Thêm sản phẩm
                        </button>
                    </div>
                </div>
                <div className={styles.adminProductSearchContainer}>
                    <SearchIcon className={styles.adminProductSearchIcon} />
                    <input type="text" placeholder="Tìm kiếm sản phẩm" className={styles.adminProductSearchInput} />
                </div>
                <div className={styles.adminProductTableContainer}>
                    <table className={styles.adminProductTable}>
                        <thead className={styles.adminProductTableHead}>
                            <tr className={styles.adminProductTableRow}>
                                <th className={styles.adminProductTableHeadCell}>Tên sản phẩm</th>
                                <th className={styles.adminProductTableHeadCell}>Giá</th>
                                <th className={styles.adminProductTableHeadCell}>Số lượng</th>
                                <th className={styles.adminProductTableHeadCell}>Ngày tạo</th>
                                <th className={styles.adminProductTableHeadCell}>Ngày cập nhật</th>
                                <th className={styles.adminProductTableHeadCell}>Tồn kho</th>
                                <th className={styles.adminProductTableHeadCell}>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody className={styles.adminProductTableBody}>
                            <tr className={styles.adminProductTableRow}>
                                <td className={styles.adminProductTableCell}>Táo</td>
                                <td className={styles.adminProductTableCell}>100.000</td>
                                <td className={styles.adminProductTableCell}>100</td>
                                <td className={styles.adminProductTableCell}>2025-01-01</td>
                                <td className={styles.adminProductTableCell}>2025-01-01</td>
                                <td className={styles.adminProductTableCell}>100</td>
                                <td className={styles.adminProductTableCell}>Không có</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
            {isAddProduct && (
                <div className={styles.adminProductAddProductOverlay}>
                    <div className={styles.adminProductAddProductContainer}>
                        <h1 className={styles.adminProductAddProductTitle}>Thêm sản phẩm</h1>
                        <button className={styles.adminProductAddProductCloseButton} onClick={handleCloseAddProduct} title="Đóng">
                            <XIcon className={styles.adminProductAddProductCloseButtonIcon} />
                        </button>
                    </div>
                    <div className={styles.adminProductAddProductFormContainer}>
                        <form className={styles.adminProductAddProductForm}>
                            <input type="text" placeholder="Tên sản phẩm" className={styles.adminProductAddProductFormInput} />
                            <input type="text" placeholder="Giá" className={styles.adminProductAddProductFormInput} />
                            <input type="text" placeholder="Đơn vị" className={styles.adminProductAddProductFormInput} />
                            <input type="text" placeholder="Số lượng" className={styles.adminProductAddProductFormInput} />
                            <input type="text" placeholder="Ngày tạo" className={styles.adminProductAddProductFormInput} />
                            <input type="text" placeholder="Loại trái cây" className={styles.adminProductAddProductFormInput} />
                            <input type="text" placeholder="Ghi chú" className={styles.adminProductAddProductFormInput} />
                        </form>
                        <button className={styles.adminProductAddProductFormButton}>Thêm sản phẩm</button>
                    </div>
                </div>
            )}
            {isAddCategory && (
                <div className={styles.adminProductAddCategoryOverlay}>
                    <div className={styles.adminProductAddCategoryContainer}>
                        <h1 className={styles.adminProductAddCategoryTitle}>Thêm danh mục</h1>
                        <button className={styles.adminProductAddCategoryCloseButton} onClick={handleCloseAddCategory} title="Đóng">
                            <XIcon className={styles.adminProductAddCategoryCloseButtonIcon} />
                        </button>
                    </div>
                    <div className={styles.adminProductAddCategoryFormContainer}>
                        <form className={styles.adminProductAddCategoryForm}>
                            <input type="text" placeholder="Tên danh mục" className={styles.adminProductAddCategoryFormInput} />
                        </form>
                        <button className={styles.adminProductAddCategoryFormButton}>Thêm danh mục</button>
                    </div>
                </div>
            )}
        </div>
    )
}
