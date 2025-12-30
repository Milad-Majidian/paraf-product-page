import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowDownWideNarrow,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import UserReview from "./UserReview";

const sortOptions = [
  { id: "32221", value: "mostRecent", label: "جدیدترین" },
  { id: "32222", value: "userReviews", label: "دیدگاه خریداران" },
  { id: "32223", value: "helpful", label: "مفیدترین" },
];

export default function ProductReviews() {
  const [selectedSort, setSelectedSort] = useState<string>("mostRecent");

  return (
    <>
      <h2 className="text-text-primary text-[15px]">امتیاز و نظر کاربران</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="flex justify-center items-center gap-1">
              <span className="text-text-primary font-bold text-sm">
                ٪ ۹۱.۶ 
              </span>
              <span className="text-[10px]">رضایت از ۳٬۰۵۳ دیدگاه</span>
            </p>
            <button
              aria-label="ثبت دیدگاه"
              className="w-full h-8 flex justify-center items-center gap-2 
              text-sm border border-border-secondary rounded-md cursor-pointer"
            >
              ثبت دیدگاه
              <MessageCircle size={18} className="text-text-tertiary" />
            </button>
            <p className="text-text-secondary text-xs">
              با ثبت دیدگاه بر روی کالاهای خریداری شده، 5 امتیاز در پاراف‌پوینت
              دریافت کنید
            </p>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex py-2 justify-start items-center">
            <div className="flex justify-start items-center gap-1 text-text-tertiary text-[11px]">
              <ArrowDownWideNarrow size={18} />
              مرتب‌سازی:
            </div>

            <div className="flex justify-between items-center gap-4 mr-4 cursor-pointer text-text-secondary text-[11px]">
              {sortOptions.map((option) => (
                <span
                  key={option.id}
                  className={cn(
                    // smooth color transition for hover/selected states
                    "hover:text-text-primary transition-colors duration-200 ease-in-out cursor-pointer px-1",
                    selectedSort === option.value
                      ? "text-text-primary font-medium"
                      : ""
                  )}
                  onClick={() => setSelectedSort(option.value)}
                >
                  {option.label}
                </span>
              ))}
            </div>
          </div>
          <Separator className="w-full bg-border-primary" />
          <UserReview />
        </div>
      </div>
    </>
  );
}
