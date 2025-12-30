"use client";

import { useState, useRef, useEffect } from "react";
import { Separator } from "@/components/elements/Separator";
import { Share2, Bookmark, ChevronLeft, ChevronDown } from "lucide-react";
import ProductColors from "./ProductColors";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ProductReviews from "./ProductReviews";

const features = [
  "Apple",
  "iOS",
  "۱۲۸GB",
  "۶GB RAM",
  "۶.۱ inch",
  "۱۲MP",
  "Face ID",
  "۵G",
  "China",
  "۲Sim",
];

export default function ProductInformation() {
  const [expanded, setExpanded] = useState(false);

  const innerRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const COLLAPSED_HEIGHT = 72; // ~ 3 lines with `leading-6`

  useEffect(() => {
    const measure = () => {
      if (innerRef.current) setContentHeight(innerRef.current.scrollHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <div className="col-span-2 py-2">
        <div className="flex justify-between items-center">
          <p className="bg-bg-body text-text-primary text-[12px] rounded-2xl px-2 py-1 text-center">
            آگهی فروش کالا
          </p>
          <div className="flex justify-center items-center gap-2.5">
            <button
              aria-label="اشتراک گذاری"
              className="flex items-center justify-center w-9 h-9 border border-border-secondary rounded-full p-1 cursor-pointer"
            >
              <Share2 size={19} />
            </button>

            <button
              aria-label="نشانه گذاری"
              className="flex items-center justify-center w-9 h-9 border border-border-secondary rounded-full p-1 cursor-pointer"
            >
              <Bookmark size={19} />
            </button>
          </div>
        </div>
        <Separator className="w-full bg-border-primary" />
        <div>
          <h1 className="font-bold text-lg line-clamp-2">
            گوشی اپل iPhone 14 CH رجیسترشده گوشی اپل iPhone 14 CH رجیسترشده گوشی
            اپل iPhone 14 CH رجیسترشده هوشمند طلایی گوشی اپل iPhone 14 CH
            رجیسترشده
          </h1>
          <div className="flex justify-between items-center mt-8">
            <p
              aria-label="موجودی محصول ۳۹ عدد"
              className="bg-success/15 text-success text-[12px] rounded-2xl px-2 py-1 text-center"
            >
              موجودی: ۳۹ عدد
            </p>

            {/* User Satisfied */}
            <div className="flex items-center gap-4">
              <p aria-label="رضایت خریداران" className="text-[13px]">
                <span className="text-primaryBlue text-[14px] font-bold">
                  ۷۸ ٪
                </span>{" "}
                رضایت خریداران
              </p>

              {/* User reviews */}
              <p
                aria-label="دیدگاه کاربران"
                className="flex items-center gap-1 bg-[#E0E4E6] text-text-primary text-[12px] border border-border-secondary rounded-2xl px-2 py-1 text-center cursor-pointer"
              >
                <span>۱۰۷۰</span> دیدگاه{" "}
                <ChevronLeft size={15} className="text-text-secondary" />
              </p>
            </div>
          </div>
        </div>
        {/* Specifications Section */}
        <Separator className="w-full bg-border-primary" />
        <div>
          <p className="text-text-primary">
            <span className="text-[15px]">ویژگی‌ها</span>
          </p>
          <div>
            <ul className="max-w-125 flex flex-wrap gap-2 items-center list-none mt-2 text-text-secondary text-sm space-y-1">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="bg-border-primary text-text-primary font-[11px] p-2 rounded-full "
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
            <p className="flex justify-end items-center gap-2 text-text-primary mt-4 text-xs font-medium cursor-pointer">
              مشاهده همه ویژگی‌ها
              <ChevronDown size={16} />
            </p>
        </div>
        <Separator className="w-full bg-border-primary" />
        <ProductColors />
        <Separator className="w-full bg-border-primary" />
         {/* Description Section */}
        <div className="mt-4">
          <h2 className="text-text-primary text-[15px]">توضیحات</h2>

          <div className="flex flex-col justify-center items-end mt-2">
            <div
              className="w-full overflow-hidden"
              style={{
                maxHeight: expanded
                  ? `${contentHeight}px`
                  : `${COLLAPSED_HEIGHT}px`,
                transition: "max-height 280ms ease",
              }}
            >
              <p
                ref={innerRef}
                className={`text-text-secondary text-sm leading-6 ${
                  !expanded ? "line-clamp-3" : ""
                }`}
              >
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>

            <button
              onClick={() => setExpanded((s) => !s)}
              aria-expanded={expanded}
              className="flex gap-2 mt-2 text-xs font-medium cursor-pointer"
            >
              {expanded ? "کمتر" : "بیشتر"}
              <ChevronDown
                size={16}
                className={
                  expanded
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              />
            </button>
          </div>
        </div>
        {/* Insurance Section */}
        <Separator className="w-full bg-border-primary" />
        <div className="col-span-1 bg-bg-body rounded-xl p-4">
          <p className="text-text-primary text-[15px]">بیمه</p>
          <div className="flex items-center gap-3 mt-4">
            <Checkbox id="terms" className="text-text-secondary cursor-pointer" />
            <Label htmlFor="terms" className="text-text-secondary cursor-pointer">بیمه تجهیزات دیجیتال - بیمه سامان</Label>
          </div>
          <p className="flex justify-end items-center gap-1">
            <span className="bg-red-600 text-xs text-white rounded-xl px-1 py-0.5">۵۰ ٪</span>
            <span className="text-text-tertiary text-sm line-through">۱٬۰۸۷٬۰۰۰</span>
                ۹۰۲٬۰۰۰
            <span className="text-text-secondary text-[11px]">تومان</span>
          </p>
            <p className="flex items-center justify-end gap-2 text-text-primary mt-4 text-xs font-medium cursor-pointer">
              مشاهده جزئیات
              <ChevronDown size={16} />
            </p>
        </div>
        <Separator className="w-full bg-border-primary" />
        {/* Product Reviews */}
         <ProductReviews />     
      </div>
    </>
  );
}
