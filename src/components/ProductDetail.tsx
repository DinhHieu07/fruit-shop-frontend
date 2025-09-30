"use client";
import styles from "../styles/ProductDetail.module.css";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { apiGetComments, apiGetProduct } from "../service/apiProduct";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { apiHelpful, apiReplyComment, apiSendRating } from "../service/apiComment";
import Resultpopup from "./ResultPopup";

interface Product {
    _id: string;
    name: string;
    price: number;
    unit: string;
    quantity: number;
    createdAt: string;
    category: string;
    images: string[];
    description: string;
    note: string;
    stock: number;
    updatedAt: string;
}

interface User {
    _id: string;
    fullname: string;
    avatar: string;
    email: string;
    address: string;
    role: string;
    provider: string;
    googleId: string;
    createdAt: string;
}

interface Comment {
    _id: string;
    productId: string;
    userId: User;
    content: string;
    rating: number;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
    helpful: number;
    helpfulUsers: string[];
    reply: number;
    replies?: Reply[];
}

interface Reply {
    _id: string;
    userId: User;
    content: string;
    rating?: number;
    createdAt: string;
    helpful: number;
    helpfulUsers: string[];
}

export default function ProductDetail() {
    const params = useParams();
    const id = params?.detail as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [starAvarage, setStarAvarage] = useState<number>(0);
    const [starOption, setStarOption] = useState<number>(0);
    const [currentTab, setCurrentTab] = useState('all');
    const [currentUserId, setCurrentUserId] = useState<string>("");
    const [replyCommentBar, setReplyCommentBar] = useState<boolean>(false);
    const [replyCommentBarId, setReplyCommentBarId] = useState<string>("");
    const [replyCommentBarContent, setReplyCommentBarContent] = useState<string>("");
    const [isReplyCommentBarPopup, setIsReplyCommentBarPopup] = useState<boolean>(false);
    const [isRatingPopup, setIsRatingPopup] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [userRating, setUserRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [userRatingContent, setUserRatingContent] = useState<string>("");

    const imageURL = product?.images[0] || "";

    const renderStars = (count: number) => {
        const safeCount = Math.max(0, Math.min(5, Number(count) || 0));
        return Array.from({ length: safeCount }, (_, index) => (
            <span key={index}>⭐</span>
        ));
    }

    const renderInteractiveStars = () => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= (hoverRating || userRating);
            return (
                <span
                    key={index}
                    className={`${styles.starIcon} ${isFilled ? styles.starFilled : styles.starEmpty}`}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(starValue)}
                >
                    ★
                </span>
            );
        });
    }

    const getProduct = async () => {
        const product = await apiGetProduct(id);
        setProduct(product);
        const comments = await apiGetComments(id);
        setComments(comments);
    }

    const getStarAvarage = () => {
        if (!comments || comments.length === 0) {
            setStarAvarage(0);
            return;
        }
        const totalRating = comments.reduce((acc, comment) => acc + Number(comment.rating || 0), 0);
        const average = totalRating / comments.length;
        setStarAvarage(Number(average.toFixed(1)));
        setStarOption(Number(average.toFixed(0)));
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    useEffect(() => {
        getStarAvarage();
    }, [comments]);

    useEffect(() => {
        const uid = localStorage.getItem("user_id") || "";
        setCurrentUserId(uid);
    }, []);

    const starCounts = useMemo(() => {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>;
        if (!comments || comments.length === 0) return counts;
        for (const comment of comments) {
            const rating = Number(comment.rating || 0);
            if (rating >= 1 && rating <= 5) counts[rating] += 1;
        }
        return counts;
    }, [comments]);

    const toPercent = (count: number) => {
        if (!comments || comments.length === 0) return 0;
        return Math.round((count / comments.length) * 100);
    }

    const StarBar = ({ percent }: { percent: number }) => {
        const innerRef = useRef<HTMLDivElement | null>(null);
        useEffect(() => {
            if (innerRef.current) {
                innerRef.current.style.width = `${percent}%`;
            }
        }, [percent]);
        return (
            <div className={styles.productDetailCommentEachStarNumberItemBar}>
                <div ref={innerRef} className={styles.productDetailCommentEachStarNumberItemBarInner}></div>
            </div>
        );
    }

    const renderBar = (count: number) => {
        const percent = toPercent(count);
        return <StarBar percent={percent} />
    }

    const handleAllComment = () => {
        setCurrentTab('all');
    }

    const handle5StarComment = () => {
        setCurrentTab('5');
    }

    const handle4StarComment = () => {
        setCurrentTab('4');
    }

    const handle3StarComment = () => {
        setCurrentTab('3');
    }

    const handle2StarComment = () => {
        setCurrentTab('2');
    }

    const handle1StarComment = () => {
        setCurrentTab('1');
    }

    const displayedComments = useMemo(() => {
        return currentTab === 'all'
            ? comments
            : comments.filter((c) => String(c.rating) === currentTab);
    }, [comments, currentTab]);

    const handleHelpful = async (id: string) => {
        if (!currentUserId) return alert("Vui lòng đăng nhập để đánh giá hữu ích");
        const result = await apiHelpful(id, currentUserId);
        if (!result?.success) {
            alert(result?.message || "Cập nhật thất bại");
            return;
        }

        const newHelpful: number = result.helpful;
        const toggled: boolean = !!result.toggled;

        setComments((prev) => prev.map((comment) => {
            if (comment._id === id) {
                const already = comment.helpfulUsers?.some(u => String(u) === String(currentUserId));
                let newUsers = comment.helpfulUsers || [];
                if (toggled && !already) newUsers = [...newUsers, currentUserId];
                if (!toggled && already) newUsers = newUsers.filter(u => String(u) !== String(currentUserId));
                return { ...comment, helpful: newHelpful, helpfulUsers: newUsers };
            }

            if (comment.replies && comment.replies.length > 0) {
                const updatedReplies = comment.replies.map((reply) => {
                    if (reply._id !== id) return reply;
                    const already = reply.helpfulUsers?.some(u => String(u) === String(currentUserId));
                    let newUsers = reply.helpfulUsers || [];
                    if (toggled && !already) newUsers = [...newUsers, currentUserId];
                    if (!toggled && already) newUsers = newUsers.filter(u => String(u) !== String(currentUserId));
                    return { ...reply, helpful: newHelpful, helpfulUsers: newUsers } as typeof reply;
                });
                return { ...comment, replies: updatedReplies };
            }

            return comment;
        }));
    }

    const handleReply = (id: string) => {
        setReplyCommentBar(true);
        setReplyCommentBarId(id);
        setReplyCommentBarContent("");
    }

    const handleSendReply = async (id: string) => {
        if (!currentUserId) return alert("Vui lòng đăng nhập để trả lời");
        if (replyCommentBarContent === "") return alert("Vui lòng nhập nội dung trả lời");
        setReplyCommentBar(false);
        const result = await apiReplyComment(id, currentUserId, replyCommentBarContent, replyCommentBarId);
        if (result?.success) {
            setIsReplyCommentBarPopup(true);
            setMessage(result?.message || "Trả lời thành công");
            setReplyCommentBarContent("");
        } else {
            alert(result?.message || "Trả lời thất bại");
        }
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    const handleCloseReplyCommentBarPopup = () => {
        setIsReplyCommentBarPopup(false);
        setMessage("");
    }

    const handleCloseRatingPopup = () => {
        setIsRatingPopup(false);
        setMessage("");
    }

    const handleSendRating = async () => {
        if (!currentUserId) return alert("Vui lòng đăng nhập để đánh giá");
        if (userRating === 0) return alert("Vui lòng đánh giá sản phẩm");
        if (userRatingContent === "") return alert("Vui lòng nhập nội dung đánh giá");
        const result = await apiSendRating(id, currentUserId, userRating, userRatingContent);
        if (result?.success) {
            setIsRatingPopup(true);
            setMessage(result?.message || "Đánh giá thành công");
            setUserRating(0);
            setUserRatingContent("");
        } else {
            alert(result?.message || "Đánh giá thất bại");
        }
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    return (
        <section className={styles.productDetailContainer}>
            <Header />
            <Navbar />
            <div className={styles.productDetailMain}>
                <h2 className={styles.productDetailMainImage}>
                    {imageURL && (
                        <Image className={styles.productImageDetail} src={imageURL} alt={product?.name || ""} fill />
                    )}
                </h2>
                <div className={styles.productDetailMainContent}>
                    <button className={styles.productDetailBackButton} onClick={() => window.location.href = "/"}>← Quay lại</button>
                    <h3 className={styles.productDetailMainContentName}>{product?.name}</h3>
                    <h4 className={styles.productDetailMainContentPrice}>{product?.price} VND / kg</h4>
                    <p className={styles.productDetailMainContentNote}>Mô tả: {product?.description}</p>
                    <p className={styles.productDetailMainContentContact}>(Giá chỉ mang tính chất tham khảo. Vui lòng liên hệ hotline: 0855491578 để được cập nhật bảng giá theo ngày)</p>
                </div>
            </div>
            <div className={styles.productDetailLine}></div>
            <div className={styles.productDetailComment}>
                <div className={styles.productDetailCommentHeader}>
                    <h3 className={styles.productDetailCommentTitle}>Đánh giá sản phẩm</h3>
                    <p className={styles.productDetailCommentDescription}>Chia sẻ trải nghiệm của bạn về {product?.name} của chúng tôi</p>
                </div>
            </div>
            <div className={styles.productDetailCommentStar}>
                <div className={styles.productDetailCommentStarItem}>
                    <div className={styles.productDetailCommentStarItemText}>{starAvarage}</div>
                    <div className={styles.productDetailCommentStarItemIcon}>{renderStars(starOption)}</div>
                    <div className={styles.productDetailCommentStarNumber}>Dựa trên {comments.length} đánh giá</div>
                </div>
                <div className={styles.productDetailCommentEachStarNumber}>
                    <div className={styles.productDetailCommentEachStarNumberItemContainer}>
                        <div className={styles.productDetailCommentEachStarNumberItem}>5 ⭐</div>
                        {renderBar(starCounts[5])}
                        <div className={styles.productDetailCommentEachStarNumberItemBarPercentage}>{starCounts[5]}</div>
                    </div>
                    <div className={styles.productDetailCommentEachStarNumberItemContainer}>
                        <div className={styles.productDetailCommentEachStarNumberItem}>4 ⭐</div>
                        {renderBar(starCounts[4])}
                        <div className={styles.productDetailCommentEachStarNumberItemBarPercentage}>{starCounts[4]}</div>
                    </div>
                    <div className={styles.productDetailCommentEachStarNumberItemContainer}>
                        <div className={styles.productDetailCommentEachStarNumberItem}>3 ⭐</div>
                        {renderBar(starCounts[3])}
                        <div className={styles.productDetailCommentEachStarNumberItemBarPercentage}>{starCounts[3]}</div>
                    </div>
                    <div className={styles.productDetailCommentEachStarNumberItemContainer}>
                        <div className={styles.productDetailCommentEachStarNumberItem}>2 ⭐</div>
                        {renderBar(starCounts[2])}
                        <div className={styles.productDetailCommentEachStarNumberItemBarPercentage}>{starCounts[2]}</div>
                    </div>
                    <div className={styles.productDetailCommentEachStarNumberItemContainer}>
                        <div className={styles.productDetailCommentEachStarNumberItem}>1 ⭐</div>
                        {renderBar(starCounts[1])}
                        <div className={styles.productDetailCommentEachStarNumberItemBarPercentage}>{starCounts[1]}</div>
                    </div>
                </div>
            </div>
            <div className={styles.productDetailCommentStarLine}></div>
            <div className={styles.productDetailCommentStarOption}>
                <button className={`${styles.productDetailCommentOption} ${currentTab === 'all' ? styles.productDetailCommentOptionActive : ''}`} onClick={() => handleAllComment()}>
                    <span className={styles.productDetailCommentOptionText}>Tất cả ({comments.length})</span>
                </button>
                <button className={`${styles.productDetailCommentOption} ${currentTab === '5' ? styles.productDetailCommentOptionActive : ''}`} onClick={() => handle5StarComment()}>
                    <span className={styles.productDetailCommentOptionText}>5 sao ({starCounts[5]})</span>
                </button>
                <button className={`${styles.productDetailCommentOption} ${currentTab === '4' ? styles.productDetailCommentOptionActive : ''}`} onClick={() => handle4StarComment()}>
                    <span className={styles.productDetailCommentOptionText}>4 sao ({starCounts[4]})</span>
                </button>
                <button className={`${styles.productDetailCommentOption} ${currentTab === '3' ? styles.productDetailCommentOptionActive : ''}`} onClick={() => handle3StarComment()}>
                    <span className={styles.productDetailCommentOptionText}>3 sao ({starCounts[3]})</span>
                </button>
                <button className={`${styles.productDetailCommentOption} ${currentTab === '2' ? styles.productDetailCommentOptionActive : ''}`} onClick={() => handle2StarComment()}>
                    <span className={styles.productDetailCommentOptionText}>2 sao ({starCounts[2]})</span>
                </button>
                <button className={`${styles.productDetailCommentOption} ${currentTab === '1' ? styles.productDetailCommentOptionActive : ''}`} onClick={() => handle1StarComment()}>
                    <span className={styles.productDetailCommentOptionText}>1 sao ({starCounts[1]})</span>
                </button>
            </div>
            {displayedComments.length === 0 && (
                <div className={styles.productDetailCommentContainer}>
                    <div className={styles.productDetailCommentItem}>
                        <span className={styles.productDetailCommentItemHeaderName}>Không có đánh giá</span>
                    </div>
                </div>
            )}
            {displayedComments.map((comment) => (
                <div key={comment._id} className={styles.productDetailCommentContainer}>
                    <div className={styles.productDetailCommentItem}>
                        <img src={comment.userId.avatar} alt="avatar" className={styles.productDetailCommentItemHeaderAvatar} />
                        <div className={styles.productDetailCommentItemHeader}>
                            <span className={styles.productDetailCommentItemHeaderName}>{comment.userId.fullname}</span>
                            <span className={styles.productDetailCommentItemHeaderDate}>{format(parseISO(comment.createdAt), "dd/MM/yyyy")}</span>
                        </div>
                        <div className={styles.productDetailCommentItemRating}>
                            <span className={styles.productDetailCommentItemHeaderRating}>{renderStars(comment.rating)}</span>
                        </div>
                    </div>
                    <div className={styles.productDetailCommentContent}>
                        <span className={styles.productDetailCommentContentText}>{comment.content}</span>
                    </div>
                    <div className={styles.productDetailCommentItemLine}></div>
                    <div className={styles.productDetailCommentItemReply}>
                        <button className={`${styles.productDetailCommentItemReplyIcon} ${comment.helpfulUsers?.some(u => String(u) === String(currentUserId)) ? styles.productDetailCommentItemReplyIconActive : ''}`} onClick={() => handleHelpful(comment._id)}>👍 Hữu ích ({comment.helpful})</button>
                        <button className={styles.productDetailCommentItemReplyText} onClick={() => handleReply(comment._id)}>💬 Trả lời({comment.reply})</button>
                        {replyCommentBar && comment._id === replyCommentBarId && (
                            <div className={styles.productDetailCommentReplyBar}>
                                <input type="text" placeholder="Nhập nội dung trả lời" className={styles.productDetailCommentReplyBarInput} value={replyCommentBarContent} onChange={(e) => setReplyCommentBarContent(e.target.value)} />
                                <button className={`${styles.productDetailCommentReplyBarButton} ${styles.productDetailCommentReplyBarButtonPrimary}`} onClick={() => handleSendReply(comment._id)}>Gửi</button>
                                <button className={`${styles.productDetailCommentReplyBarButton} ${styles.productDetailCommentReplyBarButtonSecondary}`} onClick={() => setReplyCommentBar(false)}>Hủy</button>
                            </div>
                        )}
                    </div>
                    {(comment.replies || []).map((reply) => (
                        <div key={reply._id} className={`${styles.productDetailCommentContainer} ${styles.productDetailCommentReply}`}>
                            <div className={styles.productDetailCommentItem}>
                                <img src={reply.userId?.avatar} alt="avatar" className={styles.productDetailCommentItemHeaderAvatar} />
                                <div className={styles.productDetailCommentItemHeader}>
                                    <span className={styles.productDetailCommentItemHeaderName}>{reply.userId?.fullname}</span>
                                    <span className={styles.productDetailCommentItemHeaderDate}>{format(parseISO(reply.createdAt), "dd/MM/yyyy")}</span>
                                </div>
                                <div className={styles.productDetailCommentItemRating}>
                                    <span className={styles.productDetailCommentItemHeaderRating}>{renderStars(reply.rating || 0)}</span>
                                </div>
                            </div>
                            <div className={styles.productDetailCommentContent}>
                                <span className={styles.productDetailCommentContentText}>{reply.content}</span>
                            </div>
                            <div className={styles.productDetailCommentItemLine}></div>
                            <div className={styles.productDetailCommentItemReply}>
                                <button className={`${styles.productDetailCommentItemReplyIcon} ${reply.helpfulUsers?.some(u => String(u) === String(currentUserId)) ? styles.productDetailCommentItemReplyIconActive : ''}`} onClick={() => handleHelpful(reply._id)}>👍 Hữu ích ({reply.helpful})</button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className={styles.productDetailCommentLine}></div>
            <div className={styles.productDetailCommentSelf}>
                <div className={styles.productDetailCommentSelfHeader}>
                    <h3 className={styles.productDetailCommentSelfTitle}>Hãy viết đánh giá của bạn</h3>
                    <h4 className={styles.productDetailCommentSelfDescription}>Đánh giá của bạn *</h4>
                    <div className={styles.productDetailCommentSelfRating} >{renderInteractiveStars()}</div>
                    <h4 className={styles.productDetailCommentSelfDescription}>Nội dung đánh giá *</h4>
                    <input type="text" placeholder="Nhập nội dung đánh giá" className={styles.productDetailCommentSelfRatingInput} value={userRatingContent} onChange={(e) => setUserRatingContent(e.target.value)} />
                    <button className={styles.productDetailCommentSelfRatingButton} onClick={() => handleSendRating()}>Gửi</button>
                </div>
            </div>
            <Footer />
            {isReplyCommentBarPopup && (
                <Resultpopup message={message} show={isReplyCommentBarPopup} onClose={handleCloseReplyCommentBarPopup} />
            )}
            {isRatingPopup && (
                <Resultpopup message={message} show={isRatingPopup} onClose={handleCloseRatingPopup} />
            )}
        </section>
    )
}