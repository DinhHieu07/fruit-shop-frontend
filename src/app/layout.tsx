import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Thanh Hoa Quả - Cửa hàng trái cây tươi ngon",
    template: "%s | Thanh Hoa Quả"
  },
  description: "Thanh Hoa Quả - Cửa hàng chuyên cung cấp các loại trái cây tươi ngon, chất lượng cao với giá cả hợp lý. Giao hàng tận nơi, đảm bảo độ tươi ngon.",
  keywords: ["trái cây", "hoa quả", "thanh hoa quả", "cửa hàng trái cây", "trái cây tươi", "giao hàng tận nơi"],
  authors: [{ name: "Thanh Hoa Quả" }],
  creator: "Thanh Hoa Quả",
  publisher: "Thanh Hoa Quả",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fruit-shop-frontend.vercel.app'), 
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Thanh Hoa Quả - Cửa hàng trái cây tươi ngon",
    description: "Cửa hàng chuyên cung cấp các loại trái cây tươi ngon, chất lượng cao với giá cả hợp lý",
    url: 'https://fruit-shop-frontend.vercel.app',
    siteName: 'Thanh Hoa Quả',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Thanh Hoa Quả Logo',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Thanh Hoa Quả - Cửa hàng trái cây tươi ngon",
    description: "Cửa hàng chuyên cung cấp các loại trái cây tươi ngon, chất lượng cao",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#f9f9f9" }}
      >
        {children}
      </body>
    </html>
  );
}
