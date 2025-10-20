"use client";
import styles from "../styles/CartClient.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { apiDeleteCart, apiDeleteCartAll, apiGetCart } from "../service/apiCart";
import { Button } from "@mui/material";
import ResultPopup from "./ResultPopup";

interface Item {
    _id: string;
    product: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
    images: string;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    unit: string;
    quantity: number;
    images: string;
    stock: number;
}

export default function CartClient() {
    const [items, setItems] = useState<Item[]>([]);
    const [productSelected, setProductSelected] = useState<string[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [quantity, setQuantity] = useState(new Map<string, number>());
    const [maxQuantity, setMaxQuantity] = useState(new Map<string, number>());
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
    const [idProductSelected, setIdProductSelected] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isResultPopup, setIsResultPopup] = useState(false);
    useEffect(() => {
        const fetchItems = async () => {
            const response = await apiGetCart();
            if (response.success === true) {
                setItems(response.data.items);
                setFilteredItems(response.data.items);
                setQuantity(new Map(response.data.items.map((item: Item) => [item._id, item.quantity])));
                setMaxQuantity(new Map(response.products.map((item: Product) => [item._id, item.stock])));
            }
        }
        fetchItems();
    }, []);

    const handleProductSelected = (e: React.ChangeEvent<HTMLInputElement>, idSelected: string) => {
        if (e.target.checked) {
            setProductSelected([...productSelected, idSelected]);
        } else {
            setProductSelected(productSelected.filter((id) => id !== idSelected));
        }
    }

    const handleSearch = (value: string) => {
        const results = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredItems(results);
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newQuantity = Number(e.target.value);
        const newQuantityMap = new Map(quantity);
        newQuantityMap.set(id, newQuantity);
        setQuantity(newQuantityMap);
        setItems(items.map((item) => item._id === id ? { ...item, quantity: newQuantity } : item));
    }

    const handleSelectAll = () => {
        if (productSelected.length === filteredItems.length) {
            setProductSelected([]);
        } else {
            setProductSelected(filteredItems.map((item) => item._id));
        }
    }

    const handleConfirmDelete = (id: string) => {
        setConfirmDelete(true);
        setIdProductSelected(id);
    }

    const handleDeleteSelected = async () => {
        const response = await apiDeleteCart(idProductSelected);
        if (response.success === true) {
            setItems(items.filter((item) => item._id !== idProductSelected));
            setFilteredItems(filteredItems.filter((item) => item._id !== idProductSelected));
            setQuantity(new Map(Array.from(quantity).filter(([key]) => key !== idProductSelected)));
            setProductSelected([]);
            setConfirmDelete(false);
            setIdProductSelected("");
            setMessage(response.message);
            setIsResultPopup(true);
        } else {
            alert(response.message);
            setConfirmDelete(false);
        }
    }

    const handleDeleteSelectedAll = async () => {
        const response = await apiDeleteCartAll();
        if (response.success === true) {
            setItems(items.filter((item) => !productSelected.includes(item._id)));
            setFilteredItems(filteredItems.filter((item) => !productSelected.includes(item._id)));
            setQuantity(new Map(Array.from(quantity).filter(([key]) => !productSelected.includes(key))));
            setProductSelected([]);
            setConfirmDeleteAll(false);
            setIsResultPopup(true);
            setMessage(response.message);
        } else {
            alert(response.message);
            setConfirmDeleteAll(false);
        }
    }

    const handleBuy = () => {
        console.log("Mua hàng");
    }

    const handleCloseResultPopup = () => {
        setIsResultPopup(false);
        setMessage("");
    }

    return (
        <section className={styles.container}>
            <Header />
            <Navbar />
            <div className={styles.main}>
                <div className={styles.cartPageContainer}>
                    <div className={styles.cartPageHeader}>
                        <h2 className={styles.cartPageBrandTitle}>Thanh Hoa Quả | Giỏ Hàng</h2>
                        <div className={styles.cartPageSearchContainer}>
                            <input placeholder="Tìm kiếm sản phẩm" className={styles.cartPageSearchInput} onChange={(e) => handleSearch(e.target.value)} />
                            <SearchIcon className={styles.cartPageSearchIcon} />
                        </div>
                    </div>
                    <div className={styles.cartPageContent}>
                        <div className={styles.cartPageContentHeader}>
                            <h3 className={styles.cartPageContentTitle}>Sản phẩm</h3>
                        </div>
                        <ul className={styles.cartPageContentInfo}>
                            <li className={styles.cartPageContentInfoTitle}>Đơn giá</li>
                            <li className={styles.cartPageContentInfoTitle}>Số lượng</li>
                            <li className={styles.cartPageContentInfoTitle}>Số tiền</li>
                            <li className={styles.cartPageContentInfoTitle}>Hành động</li>
                        </ul>
                    </div>
                    <div className={styles.cartPageContentList}>
                        <ul className={styles.cartPageContentListItems}>
                            {filteredItems.length === 0 ? (
                                <li className={styles.cartPageContentListItemsEmpty}>Chưa có sản phẩm nào</li>
                            ) : (
                                <>
                                    {filteredItems.map((item) => (
                                        <li key={item._id} className={`${styles.cartPageContentListItemsItem} ${productSelected.includes(item._id) ? styles.cartPageContentListItemsItemSelected : ""}`}>
                                            <input type="checkbox" className={styles.cartPageContentListItemsItemCheckbox} checked={productSelected.includes(item._id)} onChange={(e) => handleProductSelected(e, item._id)} />
                                            <img src={item.images} alt={item.name} className={styles.cartPageContentListItemsItemImage} />
                                            <p className={styles.cartPageContentListItemsItemContentName}>{item.name}</p>
                                            <div className={styles.cartPageContentListItemsItemContent}>
                                                <span className={styles.cartPageContentListItemsItemContentPrice}>{item.price} VND</span>
                                                <input type="number" className={styles.cartPageContentListItemsItemQuantity} value={quantity.get(item._id)} min={1} max={maxQuantity.get(item.product)} onChange={(e) => handleQuantityChange(e, item._id)} />
                                                <span className={styles.cartPageContentListItemsItemTotalPrice}>{item.price * (quantity.get(item._id) || 0)} VND</span>
                                                <div className={styles.cartPageContentListItemsItemAction}>
                                                    <Button variant="contained" color="primary" onClick={() => handleConfirmDelete(item._id)}>Xóa</Button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </div>
                    <div className={styles.cartPageTotal}>
                        <div className={styles.cartPageTotalSelectAll}>
                            <input type="checkbox" className={styles.cartPageTotalSelectAllInput} checked={productSelected.length === filteredItems.length} onChange={() => handleSelectAll()} />
                            <Button variant="contained" color="primary" onClick={() => handleSelectAll()} className={styles.cartPageButton}>Chọn tất cả</Button>
                        </div>
                        <div className={styles.cartPageTotalDeleteSelected}>
                            <Button variant="contained" color="primary" onClick={() => setConfirmDeleteAll(true)} className={styles.cartPageButton}>Xóa tất cả sản phẩm</Button>
                        </div>
                        <div className={styles.cartPageTotalPrice}>
                            <span className={styles.cartPageTotalPriceText}>Tổng tiền({filteredItems.length} sản phẩm): {filteredItems.reduce((total, item) => total + item.price * (quantity.get(item._id) || 0), 0)} VND</span>
                        </div>
                        <div className={styles.cartPageTotalButton}>
                            <Button variant="contained" color="primary" onClick={() => handleBuy()} className={styles.cartPageButton}>Mua hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
            {confirmDelete && (
                <div className={styles.confirmDelete}>
                    <div className={styles.confirmDeleteContent}>
                        <p className={styles.confirmDeleteTitle}>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
                        <div className={styles.confirmDeleteFormContainer}>
                            <Button variant="contained" color="primary" onClick={() => handleDeleteSelected()} className={styles.cartPageButton}>Xóa</Button>
                            <Button variant="contained" color="secondary" onClick={() => setConfirmDelete(false)} className={styles.cartPageButtonDelete}>Hủy</Button>
                        </div>
                    </div>
                </div>
            )}
            {confirmDeleteAll && (
                <div className={styles.confirmDeleteAll}>
                    <div className={styles.confirmDeleteAllContent}>
                        <p className={styles.confirmDeleteAllTitle}>Bạn có chắc chắn muốn xóa tất cả sản phẩm không?</p>
                        <div className={styles.confirmDeleteAllFormContainer}>
                            <Button variant="contained" color="primary" onClick={() => handleDeleteSelectedAll()} className={styles.cartPageButton}>Xóa</Button>
                            <Button variant="contained" color="secondary" onClick={() => setConfirmDeleteAll(false)} className={styles.cartPageButtonDelete}>Hủy</Button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
            {
                isResultPopup && (
                    <ResultPopup message={message} show={isResultPopup} onClose={handleCloseResultPopup} />
                )
            }
        </section>
    )
}