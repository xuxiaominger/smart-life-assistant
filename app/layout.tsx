import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "智能生活助手 - Smart Life Assistant",
  description: "一款整合9大功能模块的智能生活助手应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
