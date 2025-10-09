import { Metadata } from "next";
import ProfileClient from "../../components/ProfileClient";

export const metadata: Metadata = {
    title: "Quản lý tài khoản",
    description: "Quản lý tài khoản dễ dàng với Thanh Hoa Quả",
    keywords: ["quản lý tài khoản", "thanh hoa quả", "admin", "profile"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Quản lý tài khoản - Thanh Hoa Quả",
        description: "Quản lý tài khoản dễ dàng với Thanh Hoa Quả",
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'Thanh Hoa Quả - Quản lý tài khoản',
            },
        ],
    },
}

export default function Profile() {
    return (
        <>
            <main className="w-[100%]">
                <h1 className="sr-only">Quản lý tài khoản - Thanh Hoa Quả</h1>
                <ProfileClient />
            </main>
        </>
    );
}