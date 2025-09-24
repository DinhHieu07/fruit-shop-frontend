import { Metadata } from "next";
import AdminProduct from "../../../components/AdminProduct";

export const metadata: Metadata = {
    title: "Quản lý sản phẩm",
    description: "Quản lý sản phẩm dễ dàng với Thanh Hoa Quả",
    keywords: ["quản lý sản phẩm", "thanh hoa quả", "admin", "product"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Quản lý sản phẩm - Thanh Hoa Quả",
        description: "Quản lý sản phẩm dễ dàng với Thanh Hoa Quả",
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'Thanh Hoa Quả - Quản lý sản phẩm',
            },
        ],
    },
};

export default function Products() {
    return <AdminProduct />;
}
