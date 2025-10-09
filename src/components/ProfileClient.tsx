"use client";
import { useState, useEffect } from "react";
import styles from "../styles/ProfileClient.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { apiGetProfile } from "../service/apiGetProfile";
import { apiUpdateAvatar, apiUpdateProfile } from "../service/apiUpdateProfile";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import Resultpopup from "./ResultPopup";
import { apiUpdatePassword } from "../service/apiUpdatePassword";

interface User {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    avatar: string;
    phone?: string;
    address?: string;
    sex?: string;
    birthdate?: string;
}

export default function ProfileClient() {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [newFullname, setNewFullname] = useState(user?.fullname || "Chưa cập nhật");
    const [newPhone, setNewPhone] = useState(user?.phone || "Chưa cập nhật");
    const [newAddress, setNewAddress] = useState(user?.address || "Chưa cập nhật");
    const [newSex, setNewSex] = useState(user?.sex || "");
    const [newBirthdate, setNewBirthdate] = useState(user?.birthdate || "");
    const [isUpdateProfilePopup, setIsUpdateProfilePopup] = useState(false);
    const [message, setMessage] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isUpdatePasswordPopup, setIsUpdatePasswordPopup] = useState(false);
    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [isUpdateAvatarPopup, setIsUpdateAvatarPopup] = useState(false);

    // Hàm format ngày tháng từ yyyy-mm-dd sang dd/mm/yyyy
    const formatDateToDisplay = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Hàm chuyển đổi dd/mm/yyyy sang yyyy-mm-dd để gửi lên server
    const formatDateForServer = (dateString: string) => {
        if (!dateString) return "";
        // Nếu đã là định dạng yyyy-mm-dd thì giữ nguyên
        if (dateString.includes('-')) return dateString;
        // Nếu là dd/mm/yyyy thì chuyển thành yyyy-mm-dd
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateString;
    };

    const checkInfo = () => {
        const regexPhone = new RegExp("^0[0-9]{9}$");
        const regexBirthdate = new RegExp("^[0-9]{2}/[0-9]{2}/[0-9]{4}$");
        if (newFullname === "" || newPhone === "" || newAddress === "" || newBirthdate === "" || newSex === "") {
            alert("Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        if (!regexPhone.test(newPhone)) {
            alert("Vui lòng nhập đúng định dạng số điện thoại");
            return false;
        }
        const formattedBirthdate = formatDateToDisplay(newBirthdate);
        if (!regexBirthdate.test(formattedBirthdate)) {
            alert("Vui lòng nhập đúng định dạng ngày sinh");
            return false;
        }
        return true;
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await apiGetProfile();
            setUser(result);
        }
        fetchProfile();
    }, []);

    useEffect(() => {
        setNewFullname(user?.fullname || "Chưa cập nhật");
        setNewPhone(user?.phone || "Chưa cập nhật");
        setNewAddress(user?.address || "Chưa cập nhật");
        setNewSex(user?.sex || "");
        setNewBirthdate(user?.birthdate || "");
        setAvatar(user?.avatar || "");
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!checkInfo()) return;
        try {
            // Chuyển đổi birthdate từ dd/mm/yyyy sang yyyy-mm-dd trước khi gửi lên server
            const formattedBirthdate = formatDateForServer(newBirthdate);

            const result = await apiUpdateProfile(newFullname, newPhone, newAddress, formattedBirthdate, newSex);
            if (result.success) {
                setMessage("Cập nhật thông tin thành công");
                setIsUpdateProfilePopup(true);
                // Refresh lại dữ liệu profile
                const updatedProfile = await apiGetProfile();
                setUser(updatedProfile);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.log(error);
            alert("Cập nhật thông tin thất bại");
        }
    }
    const handleUpdatePassword = async () => {
        if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert("Mật khẩu mới và nhập lại mật khẩu mới không khớp");
            return;
        }
        try {
            const result = await apiUpdatePassword(oldPassword, newPassword);
            if (result.success) {
                setMessage(result.message);
                setIsUpdatePasswordPopup(true);
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                alert(result.message);
            }
        }
        catch (error) {
            console.log(error);
            alert("Cập nhật mật khẩu thất bại");
        }
    }

    const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const result = await apiUpdateAvatar(file);
            if (result.success) {
                setAvatar(result.avatar);
                setMessage(result.message);
                setIsUpdateAvatarPopup(true);
            } else {
                alert(result.message);
            }
        }
    }

    const handleChangeAvatarClick = () => {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        fileInput.click();
    }

    return (
        <section className={styles.profileContainer}>
            <Header />
            <Navbar />
            <div className={styles.profileContent}>
                <div className={styles.profileSidebar}>
                    <div className={styles.profileSidebarInfo}>
                        <div className={styles.avatarWrapper}>
                            <img src={avatar || user?.avatar} alt="avatar" className={styles.profileSidebarImage} />
                            <div className={styles.profileSidebarInfoCamera} onClick={handleChangeAvatarClick}>📷</div>
                        </div>
                        <input type="file" id="fileInput" onChange={handleChangeAvatar} title="Chọn ảnh" style={{ display: "none" }} />
                        <p className={styles.profileSidebarName}>{user?.fullname}</p>
                        <p className={styles.profileSidebarEmail}>{user?.email}</p>
                    </div>
                    <div className={styles.profileSidebarButton}>
                        <Button className={`${styles.profileSidebarButtonItem} ${activeTab === "profile" ? styles.profileSidebarButtonItemActive : ""}`} variant="outlined" onClick={() => setActiveTab("profile")}>
                            <span className={styles.profileSidebarButtonItemText}>👤 Thông tin tài khoản</span>
                        </Button>
                        {user?.role === "customer" ? (
                            <Button className={`${styles.profileSidebarButtonItem} ${activeTab === "order" ? styles.profileSidebarButtonItemActive : ""}`} variant="outlined" onClick={() => setActiveTab("order")}>
                                <span className={styles.profileSidebarButtonItemText}>📦 Đơn hàng của tôi</span>
                            </Button>
                        ) : (
                            <Button className={`${styles.profileSidebarButtonItem} ${activeTab === "order" ? styles.profileSidebarButtonItemActive : ""}`} variant="outlined" onClick={() => setActiveTab("order")}>
                                <span className={styles.profileSidebarButtonItemText}>📦 Quản lý đơn hàng</span>
                            </Button>
                        )}
                        <Button className={`${styles.profileSidebarButtonItem} ${activeTab === "password" ? styles.profileSidebarButtonItemActive : ""}`} variant="outlined" onClick={() => setActiveTab("password")}>
                            <span className={styles.profileSidebarButtonItemText}>🔒 Đổi mật khẩu</span>
                        </Button>
                        <Button className={`${styles.profileSidebarButtonItem} ${activeTab === "notification" ? styles.profileSidebarButtonItemActive : ""}`} variant="outlined" onClick={() => setActiveTab("notification")}>
                            <span className={styles.profileSidebarButtonItemText}>🔔 Thông báo</span>
                        </Button>
                    </div>
                </div>
                <div className={styles.profileMain}>
                    {activeTab === "profile" && (
                        <>
                            <h2 className={styles.profileMainTitle}>Thông tin tài khoản</h2>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Họ và tên</label>
                                <TextField type="text" className={styles.profileMainInfoInput} value={newFullname} title={newFullname} variant="outlined" onChange={(e) => setNewFullname(e.target.value)} />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Email</label>
                                <TextField type="text" className={styles.profileMainInfoInput} value={user?.email || "Chưa cập nhật"} title={user?.email || "Chưa cập nhật"} variant="outlined" disabled />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Số điện thoại</label>
                                <TextField type="text" className={styles.profileMainInfoInput} value={newPhone} title={newPhone} variant="outlined" onChange={(e) => setNewPhone(e.target.value)} />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Giới tính</label>
                                <Select
                                    className={styles.profileMainInfoInput}
                                    value={newSex}
                                    onChange={(e) => setNewSex(e.target.value)}
                                    renderValue={(selected) => {
                                        if (selected === "nam") return "Nam";
                                        if (selected === "nữ") return "Nữ";
                                        if (selected === "khác") return "Khác";
                                        return "Chọn giới tính";
                                    }}
                                    variant="outlined"
                                    displayEmpty
                                >
                                    <MenuItem value="nam">Nam</MenuItem>
                                    <MenuItem value="nữ">Nữ</MenuItem>
                                    <MenuItem value="khác">Khác</MenuItem>
                                </Select>
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Ngày sinh</label>
                                <TextField
                                    type="text"
                                    className={styles.profileMainInfoInput}
                                    value={formatDateToDisplay(newBirthdate)}
                                    title={formatDateToDisplay(newBirthdate)}
                                    variant="outlined"
                                    onChange={(e) => {
                                        setNewBirthdate(e.target.value);
                                    }}
                                    placeholder="dd/mm/yyyy"
                                />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Vai trò</label>
                                <TextField type="text" className={styles.profileMainInfoInput} value={user?.role || "Chưa cập nhật"} title={user?.role || "Chưa cập nhật"} variant="outlined" disabled />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Địa chỉ</label>
                                <TextField type="text" className={styles.profileMainInfoInput} value={newAddress} title={newAddress} variant="outlined" onChange={(e) => setNewAddress(e.target.value)} />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <Button className={styles.profileMainInfoButton} onClick={handleUpdateProfile} variant="contained">Lưu thay đổi</Button>
                            </div>
                        </>
                    )}
                    {activeTab === "password" && (
                        <>
                            <h2 className={styles.profileMainTitle}>Đổi mật khẩu</h2>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Mật khẩu cũ</label>
                                <TextField type="password" className={styles.profileMainInfoInput} value={oldPassword} title={oldPassword} variant="outlined" onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Mật khẩu mới</label>
                                <TextField type="password" className={styles.profileMainInfoInput} value={newPassword} title={newPassword} variant="outlined" onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <label className={styles.profileMainInfoLabel}>Nhập lại mật khẩu mới</label>
                                <TextField type="password" className={styles.profileMainInfoInput} value={confirmNewPassword} title={confirmNewPassword} variant="outlined" onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            </div>
                            <div className={styles.profileMainInfo}>
                                <Button className={styles.profileMainInfoButton} onClick={handleUpdatePassword} variant="contained">Lưu thay đổi</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
            {
                isUpdateProfilePopup && (
                    <Resultpopup message={message} show={isUpdateProfilePopup} onClose={() => setIsUpdateProfilePopup(false)} />
                )
            }
            {
                isUpdatePasswordPopup && (
                    <Resultpopup message={message} show={isUpdatePasswordPopup} onClose={() => setIsUpdatePasswordPopup(false)} />
                )
            }
            {
                isUpdateAvatarPopup && (
                    <Resultpopup message={message} show={isUpdateAvatarPopup} onClose={() => setIsUpdateAvatarPopup(false)} />
                )
            }
        </section>
    )
}
