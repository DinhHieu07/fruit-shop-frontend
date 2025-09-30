import type { Metadata } from "next";
import RegisterClient from "../../components/RegisterClient";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản mới tại Thanh Hoa Quả để mua sắm trái cây tươi ngon với nhiều ưu đãi hấp dẫn. Đăng ký miễn phí và dễ dàng.",
  keywords: ["đăng ký", "tạo tài khoản", "thanh hoa quả", "register", "signup"],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Đăng ký - Thanh Hoa Quả",
    description: "Tạo tài khoản mới tại Thanh Hoa Quả để mua sắm trái cây tươi ngon",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Thanh Hoa Quả - Đăng ký',
      },
    ],
  },
};

export default function Register() {
    return (
        <>
            <main className="w-[100%]">
                <h1 className="sr-only">Đăng ký - Thanh Hoa Quả</h1>
                <RegisterClient />
            </main>
        </>
    );
}