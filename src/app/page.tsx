import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Khám phá các loại trái cây tươi ngon tại Thanh Hoa Quả. Chúng tôi cung cấp đa dạng các loại hoa quả chất lượng cao với giá cả hợp lý và dịch vụ giao hàng tận nơi.",
  keywords: ["trái cây tươi", "hoa quả", "cửa hàng trái cây", "mua trái cây online", "giao hàng tận nơi", "trái cây nhập khẩu"],
  openGraph: {
    title: "Trang chủ - Thanh Hoa Quả",
    description: "Khám phá các loại trái cây tươi ngon tại Thanh Hoa Quả",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Thanh Hoa Quả - Trang chủ',
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <main className="w-[100%]">
        <h1 className="sr-only">Trang chủ - Thanh Hoa Quả</h1>
        <HomeClient />
      </main>
    </>
  );
}
