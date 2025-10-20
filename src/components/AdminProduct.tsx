"use client";
import { useEffect, useState } from "react";
import styles from "../styles/AdminProduct.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import { PlusIcon, SearchIcon, XIcon } from "lucide-react";
import { apiAddCategory, apiGetCategories } from "../service/apiCategory";
import { apiAddProduct, apiDeleteProduct, apiEditProduct, apiGetAllProducts } from "../service/apiProduct";
import Resultpopup from "./ResultPopup";
import Select from "react-select";
import { format, parseISO } from "date-fns";
import { MdEdit, MdDelete } from "react-icons/md";

interface Category {
    _id: string;
    name: string;
}

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
    description: string;
}

export default function AdminProduct() {
    const [isAddProduct, setIsAddProduct] = useState(false);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const [isDeleteProduct, setIsDeleteProduct] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);
    const [idProduct, setIdProduct] = useState("");
    const [nameCategory, setNameCategory] = useState("");
    const [isAddCategoryPopup, setIsAddCategoryPopup] = useState(false);
    const [isAddProductPopup, setIsAddProductPopup] = useState(false);
    const [isDeleteProductPopup, setIsDeleteProductPopup] = useState(false);
    const [isEditProductPopup, setIsEditProductPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [nameProduct, setNameProduct] = useState("");
    const [priceProduct, setPriceProduct] = useState("");
    const [unitProduct, setUnitProduct] = useState("");
    const [quantityProduct, setQuantityProduct] = useState("");
    const [dateCreateProduct, setDateCreateProduct] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [imageProduct, setImageProduct] = useState("");
    const [noteProduct, setNoteProduct] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [searchProduct, setSearchProduct] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [descriptionProduct, setDescriptionProduct] = useState("");

    const transformedCategories = categories.map((category: Category) => ({
        value: category._id,
        label: category.name,
    }));

    useEffect(() => {
        const getCategories = async () => {
            const categories = await apiGetCategories();
            setCategories(categories);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            const products = await apiGetAllProducts();
            setProducts(products);
            setFilteredProducts(products);
        }
        getProducts();
    }, []);

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

    const handleAddCategoryPopup = async (name: string) => {
        if (name === "") {
            setIsAddCategoryPopup(true);
            setMessage("Vui lòng nhập tên danh mục");
            return;
        }
        const data = await apiAddCategory(name);
        setIsAddCategoryPopup(true);
        setMessage(data.message);
        setCategories([...categories, { _id: data.data._id, name: data.data.name }]);
        setIsAddCategory(false);
    }

    const handleCloseAddCategoryPopup = () => {
        setIsAddCategoryPopup(false);
    }

    const handleCloseAddProductPopup = () => {
        setIsAddProductPopup(false);
    }

    const handleCloseDeleteProductPopup = () => {
        setIsDeleteProductPopup(false);
    }

    const handleCloseEditProductPopup = () => {
        setIsEditProductPopup(false);
    }

    const handleAddProductPopup = async () => {
        const validationFields = [
            { value: nameProduct, message: "Vui lòng nhập tên sản phẩm" },
            { value: priceProduct, message: "Vui lòng nhập giá sản phẩm" },
            { value: unitProduct, message: "Vui lòng nhập đơn vị sản phẩm" },
            { value: quantityProduct, message: "Vui lòng nhập số lượng sản phẩm" },
            { value: dateCreateProduct, message: "Vui lòng nhập ngày tạo sản phẩm" },
            { value: categoryProduct, message: "Vui lòng chọn danh mục sản phẩm" },
            { value: imageProduct, message: "Vui lòng nhập hình ảnh sản phẩm" },
        ];

        for (const field of validationFields) {
            if (field.value === "") {
                setIsAddProductPopup(true);
                setMessage(field.message);
                return;
            }
        }

        if (isNaN(Number(priceProduct)) || Number(priceProduct) <= 0) {
            setIsAddProductPopup(true);
            setMessage("Giá sản phẩm không hợp lệ");
            return;
        }

        if (isNaN(Number(quantityProduct)) || Number(quantityProduct) <= 0) {
            setIsAddProductPopup(true);
            setMessage("Số lượng sản phẩm không hợp lệ");
            return;
        }


        if (!/^https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i.test(imageProduct)) {
            setIsAddProductPopup(true);
            setMessage("Đường dẫn ảnh không hợp lệ");
            return;
        }

        const data = await apiAddProduct(
            nameProduct,
            priceProduct,
            unitProduct,
            quantityProduct,
            dateCreateProduct,
            categoryProduct,
            imageProduct,
            noteProduct,
            descriptionProduct
        );
        setIsAddProductPopup(true);
        setMessage(data.message);
        const newProduct = {
            _id: data.data._id,
            name: data.data.name,
            price: data.data.price,
            unit: data.data.unit,
            quantity: data.data.quantity,
            createdAt: data.data.createdAt,
            category: data.data.category,
            images: data.data.images,
            note: data.data.note,
            stock: data.data.stock,
            updatedAt: data.data.updatedAt,
            description: data.data.description,
        }
        setProducts([...products, newProduct]);
        setIsAddProduct(false);
    }

    useEffect(() => {
        const results = products.filter((product: Product) => product.name.toLowerCase().includes(searchProduct.toLowerCase()));
        setFilteredProducts(results);
    }, [searchProduct, products]);

    const handleEditProduct = async (id: string) => {
        setIsEditProduct(true);
        setIdProduct(id);
        const selectedProduct = products.find((product: Product) => product._id === id);
        if (selectedProduct) {
            setNameProduct(selectedProduct.name || "");
            setPriceProduct(String(selectedProduct.price ?? ""));
            setUnitProduct(selectedProduct.unit || "");
            setQuantityProduct(String(selectedProduct.quantity ?? ""));
            setCategoryProduct(selectedProduct.category || "");
            setImageProduct((selectedProduct.images && selectedProduct.images[0]) || "");
            setNoteProduct(selectedProduct.note || "");
            setDescriptionProduct(selectedProduct.description || "");
        }
    }

    const handleDeleteProduct = async (id: string) => {
        setIsDeleteProduct(true);
        setIdProduct(id);
    }

    const handleDeleteProductPopup = async (id: string) => {
        const message = await apiDeleteProduct(id);
        setIsDeleteProductPopup(true);
        setMessage(message);
        setIsDeleteProduct(false);
        setProducts(products.filter((product: Product) => product._id !== id));
        setIdProduct("");
    }

    const handleCloseDeleteProduct = () => {
        setIsDeleteProduct(false);
        setIdProduct("");
    }

    const handleCloseEditProduct = () => {
        setIsEditProduct(false);
        setIdProduct("");
        setNameProduct("");
        setPriceProduct("");
        setUnitProduct("");
        setQuantityProduct("");
        setCategoryProduct("");
        setImageProduct("");
        setNoteProduct("");
        setDescriptionProduct("");
        setCategoryProduct("");
    }

    const handleEditProductPopup = async (id: string) => {
        const message = await apiEditProduct(id, nameProduct, priceProduct, unitProduct, quantityProduct, categoryProduct, imageProduct, noteProduct, descriptionProduct);
        setIsEditProductPopup(true);
        setMessage(message);
        setIsEditProduct(false);
        setProducts(prevProducts => prevProducts.map((product): Product => product._id === id ? { ...product, name: nameProduct, price: Number(priceProduct), unit: unitProduct, quantity: Number(quantityProduct), category: categoryProduct, images: [imageProduct], note: noteProduct, description: descriptionProduct, updatedAt: new Date().toISOString() } : product));
        setIdProduct("");
    }

    return (
        <section className={styles.adminProductContainer}>
            <Header />
            <Navbar />
            <section className={styles.adminProductMain}>
                <div className={styles.adminProductContentContainer}>
                    <div className={styles.adminProductContent}>
                        <h2 className={styles.adminProductTitle}>Quản lý Sản phẩm</h2>
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
                    <input type="text" placeholder="Tìm kiếm sản phẩm" className={styles.adminProductSearchInput} value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
                </div>
                <div className={styles.adminProductTableContainer}>
                    <table className={styles.adminProductTable}>
                        <thead className={styles.adminProductTableHead}>
                            <tr className={styles.adminProductTableRow}>
                                <th className={styles.adminProductTableHeadCell}>Tên sản phẩm</th>
                                <th className={styles.adminProductTableHeadCell}>Giá (1kg)</th>
                                <th className={styles.adminProductTableHeadCell}>Đơn vị</th>
                                <th className={styles.adminProductTableHeadCell}>Số lượng</th>
                                <th className={styles.adminProductTableHeadCell}>Ngày tạo</th>
                                <th className={styles.adminProductTableHeadCell}>Ngày cập nhật</th>
                                <th className={styles.adminProductTableHeadCell}>Tồn kho</th>
                                <th className={styles.adminProductTableHeadCell}>Ghi chú</th>
                                <th className={styles.adminProductTableHeadCell}></th>
                            </tr>
                        </thead>
                        <tbody className={styles.adminProductTableBody}>
                            {filteredProducts.map((product: Product) => (
                                <tr key={product._id} className={styles.adminProductTableRow}>
                                    <td className={styles.adminProductTableCell}>{product.name}</td>
                                    <td className={styles.adminProductTableCell}>{product.price}</td>
                                    <td className={styles.adminProductTableCell}>{product.unit}</td>
                                    <td className={styles.adminProductTableCell}>{product.quantity}</td>
                                    <td className={styles.adminProductTableCell}>{format(parseISO(product.createdAt), "dd/MM/yyyy")}</td>
                                    <td className={styles.adminProductTableCell}>{format(parseISO(product.updatedAt), "dd/MM/yyyy")}</td>
                                    <td className={styles.adminProductTableCell}>{product.stock}</td>
                                    <td className={styles.adminProductTableCell}>
                                        <div
                                            className={styles.adminProductTableCellNote}
                                            title={product.note || "Không"}
                                        >
                                            {product.note || "Không"}
                                        </div>
                                    </td>
                                    <td className={styles.adminProductTableCellActions}>
                                        <button className={styles.adminProductTableCellButton} title="Chỉnh sửa" onClick={() => handleEditProduct(product._id)}>
                                            <MdEdit className={styles.adminProductTableCellButtonIcon} />
                                        </button>
                                        <button className={styles.adminProductTableCellButton} title="Xóa" onClick={() => handleDeleteProduct(product._id)}>
                                            <MdDelete className={styles.adminProductTableCellButtonIcon} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <Footer />
            {isAddProduct && (
                <div className={styles.adminProductAddProductOverlay}>
                    <div className={styles.adminProductAddProductContainer}>
                        <h2 className={styles.adminProductAddProductTitle}>Thêm sản phẩm</h2>
                        <button className={styles.adminProductAddProductCloseButton} onClick={handleCloseAddProduct} title="Đóng">
                            <XIcon className={styles.adminProductAddProductCloseButtonIcon} />
                        </button>
                    </div>
                    <div className={styles.adminProductAddProductFormContainer}>
                        <form className={styles.adminProductAddProductForm}>
                            <input type="text" placeholder="Tên sản phẩm" className={styles.adminProductAddProductFormInput} value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} />
                            <input type="text" placeholder="Giá (VND) / 1kg" className={styles.adminProductAddProductFormInput} value={priceProduct} onChange={(e) => setPriceProduct(e.target.value)} />
                            <input type="text" placeholder="Đơn vị (kg, lạng)" className={styles.adminProductAddProductFormInput} value={unitProduct} onChange={(e) => setUnitProduct(e.target.value)} />
                            <input type="text" placeholder="Số lượng (quả, chùm)" className={styles.adminProductAddProductFormInput} value={quantityProduct} onChange={(e) => setQuantityProduct(e.target.value)} />
                            <input type="date" placeholder="Ngày tạo" className={styles.adminProductAddProductFormInput} value={dateCreateProduct} onChange={(e) => setDateCreateProduct(e.target.value)} />
                            <input type="text" placeholder="Mô tả" className={styles.adminProductAddProductFormInput} value={descriptionProduct} onChange={(e) => setDescriptionProduct(e.target.value)} />
                            <Select
                                value={transformedCategories.find(cat => cat.value === categoryProduct)}
                                id="fruits"
                                options={transformedCategories}
                                placeholder="Chọn danh mục"
                                onChange={(selectedOption) => setCategoryProduct(selectedOption?.value || "")}
                            />
                            <input type="text" placeholder="Hình ảnh (url)" className={styles.adminProductAddProductFormInput} value={imageProduct} onChange={(e) => setImageProduct(e.target.value)} />
                            <input type="text" placeholder="Ghi chú" className={styles.adminProductAddProductFormInput} value={noteProduct} onChange={(e) => setNoteProduct(e.target.value)} />
                        </form>
                        <button className={styles.adminProductAddProductFormButton} onClick={handleAddProductPopup}>Thêm sản phẩm</button>
                    </div>
                </div>
            )}
            {isAddCategory && (
                <div className={styles.adminProductAddCategoryOverlay}>
                    <div className={styles.adminProductAddCategoryContainer}>
                        <h2 className={styles.adminProductAddCategoryTitle}>Thêm danh mục</h2>
                        <button className={styles.adminProductAddCategoryCloseButton} onClick={handleCloseAddCategory} title="Đóng">
                            <XIcon className={styles.adminProductAddCategoryCloseButtonIcon} />
                        </button>
                    </div>
                    <div className={styles.adminProductAddCategoryFormContainer}>
                        <input type="text" placeholder="Tên danh mục" className={styles.adminProductAddCategoryFormInput} value={nameCategory} onChange={(e) => setNameCategory(e.target.value)} />
                        <button className={styles.adminProductAddCategoryFormButton} onClick={() => handleAddCategoryPopup(nameCategory)}>Thêm danh mục</button>
                    </div>
                </div>
            )}
            {isDeleteProduct && (
                <div className={styles.adminDeleteProductOverlay}>
                    <div className={styles.adminDeleteProductContainer}>
                        <h2 className={styles.adminDeleteProductTitle}>Bạn có chắc chắn muốn xóa sản phẩm này không?</h2>
                    </div>
                    <div className={styles.adminDeleteProductFormContainer}>
                        <button className={styles.adminDeleteProductFormButton} onClick={() => handleDeleteProductPopup(idProduct)}>Có</button>
                        <button className={styles.adminDeleteProductFormButton} onClick={handleCloseDeleteProduct}>Không</button>
                    </div>
                </div>
            )}
            {isEditProduct && (
                <div className={styles.adminEditProductOverlay}>
                    <div className={styles.adminEditProductContainer}>
                        <h2 className={styles.adminEditProductTitle}>Chỉnh sửa sản phẩm</h2>
                    </div>
                    <div className={styles.adminEditProductFormContainer}>
                        <div className={styles.adminEditProductFormInputContainer}>
                            <label htmlFor="nameProduct" className={styles.adminEditProductFormLabel}>Tên sản phẩm</label>
                            <input id="nameProduct" type="text" placeholder="Tên sản phẩm" className={styles.adminEditProductFormInput} value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} />
                        </div>
                        <div className={styles.adminEditProductFormInputContainer}>
                            <label htmlFor="priceProduct" className={styles.adminEditProductFormLabel}>Giá (VND) / 1kg</label>
                            <input id="priceProduct" type="text" placeholder="Giá (VND) / 1kg" className={styles.adminEditProductFormInput} value={priceProduct} onChange={(e) => setPriceProduct(e.target.value)} />
                        </div>
                        <div className={styles.adminEditProductFormInputContainer}>
                            <label htmlFor="unitProduct" className={styles.adminEditProductFormLabel}>Đơn vị (kg, lạng)</label>
                            <input id="unitProduct" type="text" placeholder="Đơn vị (kg, lạng)" className={styles.adminEditProductFormInput} value={unitProduct} onChange={(e) => setUnitProduct(e.target.value)} />
                        </div>
                        <div className={styles.adminEditProductFormInputContainer}>
                            <label htmlFor="quantityProduct" className={styles.adminEditProductFormLabel}>Số lượng (quả, chùm)</label>
                            <input id="quantityProduct" type="text" placeholder="Số lượng (quả, chùm)" className={styles.adminEditProductFormInput} value={quantityProduct} onChange={(e) => setQuantityProduct(e.target.value)} />
                        </div>
                        <div className={styles.adminEditProductFormInputContainer}>
                            <label htmlFor="imageProduct" className={styles.adminEditProductFormLabel}>Hình ảnh (url)</label>
                            <input id="imageProduct" type="text" placeholder="Hình ảnh (url)" className={styles.adminEditProductFormInput} value={imageProduct} onChange={(e) => setImageProduct(e.target.value)} />
                        </div>
                        <div className={styles.adminEditProductFormInputContainer}>
                            <label htmlFor="noteProduct" className={styles.adminEditProductFormLabel}>Ghi chú</label>
                            <input id="noteProduct" type="text" placeholder="Ghi chú" className={styles.adminEditProductFormInput} value={noteProduct} onChange={(e) => setNoteProduct(e.target.value)} />
                        </div>
                        <div className={styles.adminEditProductFormInputContainer}>
                            <label htmlFor="descriptionProduct" className={styles.adminEditProductFormLabel}>Mô tả</label>
                            <input id="descriptionProduct" type="text" placeholder="Mô tả" className={styles.adminEditProductFormInput} value={descriptionProduct} onChange={(e) => setDescriptionProduct(e.target.value)} />
                        </div>
                        <div className={styles.wrapper}>
                            <Select
                                value={transformedCategories.find(cat => cat.value === categoryProduct)}
                                id="fruits"
                                options={transformedCategories}
                                placeholder="Chọn danh mục"
                                onChange={(selectedOption) => setCategoryProduct(selectedOption?.value || "")}
                                classNamePrefix="my-select"
                            />
                        </div>
                    </div>
                    <div className={styles.adminEditProductFormButtonContainer}>
                        <button className={styles.adminEditProductFormButton} onClick={() => handleEditProductPopup(idProduct)}>Chỉnh sửa</button>
                        <button className={styles.adminEditProductFormButton} onClick={handleCloseEditProduct}>Đóng</button>
                    </div>
                </div>
            )}
            {isAddCategoryPopup && (
                <Resultpopup message={message} show={isAddCategoryPopup} onClose={handleCloseAddCategoryPopup} />
            )}
            {isAddProductPopup && (
                <Resultpopup message={message} show={isAddProductPopup} onClose={handleCloseAddProductPopup} />
            )}
            {isDeleteProductPopup && (
                <Resultpopup message={message} show={isDeleteProductPopup} onClose={handleCloseDeleteProductPopup} />
            )}
            {isEditProductPopup && (
                <Resultpopup message={message} show={isEditProductPopup} onClose={handleCloseEditProductPopup} />
            )}
        </section>
    )
}
