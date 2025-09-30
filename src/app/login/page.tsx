import type { Metadata } from "next";
import LoginClient from "../../components/LoginClient";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản Thanh Hoa Quả để mua sắm trái cây tươi ngon với nhiều ưu đãi hấp dẫn. Hỗ trợ đăng nhập bằng Google.",
  keywords: ["đăng nhập", "tài khoản", "thanh hoa quả", "login", "đăng nhập google"],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Đăng nhập - Thanh Hoa Quả",
    description: "Đăng nhập vào tài khoản Thanh Hoa Quả để mua sắm trái cây tươi ngon",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Thanh Hoa Quả - Đăng nhập',
      },
    ],
  },
};

export default function Login() {
    return (
        <>
            <main className="w-[100%]">
                <h1 className="sr-only">Đăng nhập - Thanh Hoa Quả</h1>
                <LoginClient />
            </main>
        </>
    );
}
