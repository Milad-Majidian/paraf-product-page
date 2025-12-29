"use client";

import {
  BellRing,
  Box,
  Briefcase,
  ChevronDown,
  Plus,
  Search,
  ShoppingCart,
  UserCog,
  Wrench,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/elements/Button";
import Image from "next/image";
import { Input } from "../elements/Input";
import { Separator } from "../ui/separator";
import { ProgressBar } from "@/components/elements/ProgressBar";
import { Flag } from "lucide-react";

const menu = [
  { name: "product", title: "کالا", icon: <Box size={20} /> },
  { name: "services", title: "خدمات", icon: <Wrench size={20} /> },
  { name: "showcases", title: "ویترین ها", icon: <Briefcase size={20} /> },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-card shadow-lg">
      {/* Main Header */}
      <div className="border-b border-border-primary">
        <div className="base-container flex h-16 items-center justify-between">
          {/* Left Section: Logo and Navigation */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo/logo.svg"
                alt="Paraf Logo"
                width={98}
                height={40}
                className="object-contain"
              />
              <Image
                src="/images/logo/logo-type.png"
                alt="Paraf Logo Text"
                width={100}
                height={40}
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {menu.map((item) => (
                <button
                  key={item.name}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <span className="text-text-secondary">{item.icon}</span>
                  <span className="text-text-secondary text-[16px]">
                    {item.title}
                  </span>
                  {(item.name === "product" || item.name === "services") && (
                    <ChevronDown className="h-4 w-4 text-text-tertiary" />
                  )}
                </button>
              ))}
            </nav>

            {/* Desktop SearchBox */}
            <div className="hidden lg:block">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  className="w-full h-10 pl-10 rounded-[50px] border border-border-secondary bg-border-primary text-sm placeholder:text-text-tertiary"
                />
              </div>
            </div>
          </div>

          {/* Right Section: Actions and User Info */}
          <div className="flex items-center gap-3">
            {/* Language/Currency Selector */}
            <div className="hidden sm:flex gap-1 text-text-secondary text-[11px] px-6">
              <span>تومان</span>
              <span>/</span>
              <span>FA</span>
            </div>

            {/* Action Icons and Button */}
            <div className="flex items-center gap-3">
              <div className="flex gap-4 text-text-secondary">
                <button aria-label="Notifications" className="hover:text-text-primary transition-colors">
                  <BellRing size={19} />
                </button>
                <button aria-label="Shopping Cart" className="hover:text-text-primary transition-colors">
                  <ShoppingCart size={19} />
                </button>
                <button aria-label="User Settings" className="hover:text-text-primary transition-colors">
                  <UserCog size={19} />
                </button>
              </div>

              <Separator orientation="vertical" className="h-8 w-px bg-border-secondary/70" />

              <Button className="bg-bg-surface border border-border-secondary text-text-primary hover:bg-zinc-100 transition-colors">
                ثبت آگهی جدید
                <Plus className="h-4 w-4 text-text-tertiary" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* BreadCrumb Section */}
      <div className="bg-bg-body">
        <div className="base-container flex justify-between items-center py-2">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1">
            <span className="border border-primary rounded-full p-1">
              <ArrowRight size={24} className="text-primary"/>
            </span>
            <span className="text-text-secondary text-[13px]">صفحه اصلی</span>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-tertiary text-[13px]">آگهی محصول</span>
          </div>

          {/* User Info Section */}
          <div className="flex items-center gap-6">
            {/* Wallet */}
            <div className="hidden sm:flex h-7 items-center gap-2 bg-bg-surface border border-border-secondary text-text-primary rounded-sm px-2">
              <span className="text-[13px] text-text-tertiary">کیف پول:</span>
              <span className="font-bold text-[14px]">۲,۵۰۰,۰۰۰</span>
              <span className="text-[10px] text-text-tertiary">تومان</span>
            </div>

            {/* Support */}
            <button className="hidden md:block text-text-tertiary text-[14px] hover:text-text-primary transition-colors">
              پشتیبانی
            </button>

            {/* Flag Icon */}
            <button aria-label="Language" className="hidden md:block hover:opacity-80 transition-opacity">
              <Flag size={18} className="text-text-tertiary" />
            </button>

            {/* Level Progress */}
            <div className="relative h-7 w-50 flex items-center gap-2 px-3 py-1 rounded-[50px] shadow-card">
              <div className="flex justify-center items-center bg-bg-surface w-8 h-8 rounded-full absolute z-10 right-0">
                <Image
                  src="/level-cup.svg"
                  alt="level-cup"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <ProgressBar value={124} className="w-24 h-full rounded-full" rtl={true} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
