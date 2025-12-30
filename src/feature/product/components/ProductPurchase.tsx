"use client";

import Badge from "@/components/elements/Badge";
import { Button } from "@/components/elements/Button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/feature/cart/store/cartStore";
import { CircleAlert, Eye, ShoppingCart, Store } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { formatToman } from "../mocks/products";
import AddToCartCounter from "./AddToCartCounter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProductPurchaseProps {
  product: Product;
}

/**
 * Product purchase card with seller info, pricing, and cart actions
 * Counter buttons directly control cart - badge updates in real-time
 */
export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [mounted, setMounted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const cartQuantity = useCartStore((state) =>
    state.getItemQuantity(product.slug)
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Display quantity: show cart quantity if in cart, otherwise show 1 as placeholder
  // But only after mounted to prevent hydration issues
  const displayQuantity = mounted && cartQuantity > 0 ? cartQuantity : 1;

  // Calculate total based on cart quantity (or 1 if not in cart yet)
  const itemTotal = product.priceToman * displayQuantity;

  const handleIncrement = () => {
    if (cartQuantity === 0) {
      // First time: add item to cart with quantity 1
      addItem({
        productSlug: product.slug,
        title: product.title,
        priceToman: product.priceToman,
        image: product.images[0]?.src,
      });
    } else if (cartQuantity < 99) {
      // Already in cart: increment quantity
      incrementItem(product.slug);
    }
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      // Decrement (will remove if quantity becomes 0)
      decrementItem(product.slug);
    }
  };

  const handleSubmitOrder = () => {
    // Navigate to checkout or show confirmation
    // For now, ensure item is in cart
    if (cartQuantity === 0) {
      addItem({
        productSlug: product.slug,
        title: product.title,
        priceToman: product.priceToman,
        image: product.images[0]?.src,
      });
    }
    // TODO: Navigate to checkout page
    console.log("Navigating to checkout...");
  };

  const isInCart = cartQuantity > 0;

  return (
    <aside
      className="col-span-1 rounded-xl bg-bg-body px-4 py-6"
      aria-label="اطلاعات خرید محصول"
    >
      {/* Seller information section */}
      <section className="mb-6">
        <header className="mb-3 flex items-center justify-start gap-3 text-sm font-medium text-text-primary">
          <Store size={20} className="text-text-tertiary" aria-hidden="true" />
          <h3 className="text-sm">فروشگاه پاسارگاد</h3>
          <Eye size={15} aria-hidden="true" />
        </header>

        <div className="flex items-center justify-center gap-4">
          {/* Seller level badge */}
          <div className="flex items-center justify-center gap-1">
            <Badge className="gap-1 bg-accentPurple/25 text-text-primary">
              <span className="font-normal!">سطح برنزی</span>
              <span className="font-bold!">۸۹</span>
            </Badge>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-surface">
              <Image
                src="/images/header/level-cup.svg"
                alt="سطح فروشنده"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
          </div>

          <div className="h-6 w-px bg-[#E0E4E6]" aria-hidden="true"></div>

          {/* Seller performance */}
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-text-secondary">عملکرد</span>
            <span className="text-xs text-success">عالی</span>
            <CircleAlert
              size={20}
              className="text-text-tertiary"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <Separator className="my-6 w-full bg-[#E0E4E6]" />

      {/* Pricing section */}
      <section className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-[13px]">قیمت کالا</span>
          <div className="flex items-center gap-1">
            <span className="text-[20px] font-extrabold">
              {formatToman(product.priceToman)}
            </span>
            <span className="text-[11px] text-text-secondary">تومان</span>
          </div>
        </div>
      </section>

      <Separator className="my-6 w-full bg-[#E0E4E6]" />

      {/* Quantity and total section - always visible */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-[13px]">تعداد سفارش</span>
          <AddToCartCounter
            quantity={displayQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            minQuantity={0}
            maxQuantity={99}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[13px]">جمع کل</span>
          <div className="flex items-center gap-1">
            <span className="text-[20px]">{formatToman(itemTotal)}</span>
            <span className="text-[11px] text-text-secondary">تومان</span>
          </div>
        </div>
      </section>

      <Separator className="my-6 w-full bg-[#E0E4E6]" />
      <div className="bg-primary/20 flex flex-col justify-center items-start rounded-xl p-3  mb-4 gap-5">
        <div className="flex items-center justify-center gap-1">
          <Checkbox id="terms" className="bg-white text-text-secondary cursor-pointer" />
          <Label htmlFor="terms" className="text-text-secondary cursor-pointer font-light! text-sm">
            پرداخت امن (خرید مطمئن به پشتوانه پاراف)
          </Label>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Checkbox id="terms" className="bg-white text-text-secondary cursor-pointer" />
          <Label htmlFor="terms" className="text-text-secondary cursor-pointer font-light! text-sm">
            پرداخت اقساطی
          </Label>
        </div>
      </div>
      {/* Submit order button */}
      <Button
        onClick={handleSubmitOrder}
        // disabled={cartQuantity === 0}
        className="h-11 w-full rounded-lg bg-primary font-medium text-[16px] text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="ثبت سفارش"
      >
        ثبت سفارش
        <ShoppingCart className="ml-1" aria-hidden="true" />
      </Button>
    </aside>
  );
}
