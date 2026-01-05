import { Header } from "@/components/layout/Header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="base-container">{children}</main>
      <div className="h-12"></div>
    </>
  );
}
