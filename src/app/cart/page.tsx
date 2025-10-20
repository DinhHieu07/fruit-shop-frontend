import { Metadata } from "next";
import CartClient from "../../components/CartClient";

export const metadata: Metadata = {
    title: "Giỏ hàng",
    description: "Giỏ hàng của bạn tại Thanh Hoa Quả",
    keywords: ["giỏ hàng", "thanh hoa quả", "cart"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Giỏ hàng - Thanh Hoa Quả",
        description: "Giỏ hàng của bạn",
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'Thanh Hoa Quả - Giỏ hàng',
            },
        ],
    },
};

export default function Cart() {
    return (
        <>
            <main className="w-[100%]">
                <h1 className="sr-only">Giỏ hàng - Thanh Hoa Quả</h1>
                <CartClient />
            </main>
        </>
    )
}