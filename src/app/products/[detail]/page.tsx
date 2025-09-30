import { Metadata } from "next";
import ProductDetail from "../../../components/ProductDetail";

export const metadata: Metadata = {
    title: "Chi tiết sản phẩm",
    description: "Chi tiết sản phẩm dễ dàng với Thanh Hoa Quả",
    keywords: ["chi tiết sản phẩm", "thanh hoa quả", "admin", "product"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Chi tiết sản phẩm - Thanh Hoa Quả",
        description: "Chi tiết sản phẩm dễ dàng với Thanh Hoa Quả",
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'Thanh Hoa Quả - Chi tiết sản phẩm',
            },
        ],
    },
};

export default function ProductDetailPage() {
    return (
        <>
            <main className="w-[100%]">
                <h1 className="sr-only">Chi tiết sản phẩm - Thanh Hoa Quả</h1>
                <ProductDetail />
            </main>
        </>
    );
}
