"use client";

import Badge from "@/components/elements/Badge";
import { Button } from "@/components/elements/Button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/feature/cart/store/cartStore";
import {
  Car,
  ChevronDown,
  ChevronLeft,
  CircleAlert,
  Dot,
  Eye,
  Flag,
  Flame,
  ShieldCheck,
  ShoppingCart,
  Store,
  Undo2,
} from "lucide-react";
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
    <aside className="col-span-1" aria-label="اطلاعات خرید محصول">
      <article className="rounded-2xl bg-bg-body px-4 py-6">
          {/* Seller information section */}
          <section className="mb-6">
            <header className="mb-3 flex items-center justify-start gap-3 text-sm font-medium text-text-primary">
              <Store
                size={20}
                className="text-text-tertiary"
                aria-hidden="true"
              />
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

              <div className="h-6 w-px bg-separator" aria-hidden="true"></div>

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

          <Separator className="my-6 w-full bg-separator" />

          {/* Pricing section */}
          <section className="mb-6" aria-labelledby="price-heading">
            <dl className="flex items-center justify-between">
              <dt id="price-heading" className="text-[13px]">قیمت کالا</dt>
              <dd className="flex items-center gap-1">
                <span className="text-[20px] font-extrabold">
                  {formatToman(product.priceToman)}
                </span>
                <span className="text-[11px] text-text-secondary">تومان</span>
              </dd>
            </dl>
          </section>

          <Separator className="my-6 w-full bg-separator" />

          {/* Quantity and total section - always visible */}
          <section aria-labelledby="order-details-heading">
            <h3 id="order-details-heading" className="sr-only">جزئیات سفارش</h3>
            <dl className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <dt className="text-[13px]">تعداد سفارش</dt>
                <dd>
                  <AddToCartCounter
                    quantity={displayQuantity}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    minQuantity={0}
                    maxQuantity={99}
                  />
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-[13px]">جمع کل</dt>
                <dd className="flex items-center gap-1">
                  <span className="text-[20px] font-bold">{formatToman(itemTotal)}</span>
                  <span className="text-[11px] text-text-secondary">تومان</span>
                </dd>
              </div>
            </dl>
          </section>

          <Separator className="my-6 w-full bg-separator" />
          
          <fieldset className="bg-primary/20 rounded-xl p-3 mb-4">
            <legend className="sr-only">گزینه‌های پرداخت</legend>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-1">
                <Checkbox
                  id="secure-payment"
                  className="bg-white text-text-secondary cursor-pointer"
                />
                <Label
                  htmlFor="secure-payment"
                  className="text-text-secondary cursor-pointer font-light text-sm"
                >
                  پرداخت امن (خرید مطمئن به پشتوانه پاراف)
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <Checkbox
                  id="installment-payment"
                  className="bg-white text-text-secondary cursor-pointer"
                />
                <Label
                  htmlFor="installment-payment"
                  className="text-text-secondary cursor-pointer font-light text-sm"
                >
                  پرداخت اقساطی
                </Label>
              </div>
            </div>
          </fieldset>
          {/* Order actions */}
          <div className="space-y-3">
            <Button
              onClick={handleSubmitOrder}
              className="h-11 w-full rounded-lg bg-primary font-medium text-[16px] text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="ثبت سفارش"
            >
              <span>ثبت سفارش</span>
              <ShoppingCart size={20} className="mr-2" aria-hidden="true" />
            </Button>
            
            <Button
              onClick={() => console.log("Open bargaining modal...")}
              className="h-8 w-full rounded-lg bg-transparent border border-border/20 text-primary font-light text-sm hover:bg-primary/5"
              aria-label="پیشنهاد قیمت (چانه‌زنی)"
            >
              <span>پیشنهاد قیمت (چانه‌زنی)</span>
              <Flame size={20} className="mr-2" aria-hidden="true" />
            </Button>
          </div>
          <ul className="mt-6 space-y-4" aria-label="مزایای خرید">
            <li className="flex items-start gap-2">
              <Undo2 size={20} className="text-text-tertiary shrink-0" aria-hidden="true" />
              <span className="text-sm font-bold">
                این فروشگاه ۴۸ ساعت مرجوعی کالا دارد
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={20} className="text-text-tertiary shrink-0" aria-hidden="true" />
              <span className="text-sm">گارانتی ۱۸ ماهه شرکتی</span>
            </li>
          </ul>
          <Separator className="my-6 w-full bg-separator" />
          
          <section aria-labelledby="shipping-heading">
            <Button
              onClick={() => console.log("Toggle shipping details...")}
              className="w-full flex items-center justify-between bg-transparent p-0! hover:bg-transparent h-auto text-text-primary"
              aria-expanded="true"
              aria-controls="shipping-details"
            >
              <div className="flex items-center gap-2">
                <Car className="text-text-tertiary" style={{ width: '22px', height: '22px' }} aria-hidden="true" />
                <span id="shipping-heading" className="text-sm">روش‌ها و هزینه‌های ارسال</span>
              </div>
              <ChevronLeft className="text-text-secondary" style={{ width: '22px', height: '22px' }} aria-hidden="true" />
            </Button>
            
            <ul id="shipping-details" className="mt-4 space-y-2 text-text-secondary" aria-labelledby="shipping-heading">
              <li className="flex items-start">
                <Dot size={24} className="text-text-secondary shrink-0" aria-hidden="true" />
                <span className="text-sm">توسط پست پیشتاز، تی‌پاکس</span>
              </li>
              <li className="flex items-start">
                <Dot size={24} className="text-text-secondary shrink-0" aria-hidden="true" />
                <span className="text-sm">ارسال بین ۲ الی ۵ روز</span>
              </li>
              <li className="flex items-start">
                <Dot size={24} className="text-text-secondary shrink-0" aria-hidden="true" />
                <span className="text-sm">هزینه ارسال با خریدار</span>
              </li>
            </ul>
          </section>
        </article>
        <Button
          onClick={() => console.log("Toggle warnings...")}
          className="bg-[#F7EDCC] h-11 w-full flex justify-between items-center rounded-2xl mt-3 p-4 hover:bg-[#F7EDCC]/90"
          aria-expanded="false"
          aria-label="مشاهده هشدارهای قبل از معامله"
        >
          <span className="text-sm text-[#826200]">هشدارهای قبل از معامله!</span>
          <ChevronDown size={22} className="text-text-secondary" aria-hidden="true" />
        </Button>
        
        <Button
          onClick={() => console.log("Report listing...")}
          className="w-full flex justify-end items-center text-text-primary gap-2 text-sm mt-4 bg-transparent! hover:bg-transparent! p-0 h-auto"
          aria-label="گزارش این آگهی"
        >
          <span className="text-sm">گزارش آگهی</span>
          <Flag size={18} aria-hidden="true" />
        </Button>
      </aside>
  );
}
