import { Separator } from "@/components/elements/Separator";
import { Share2, Bookmark,ChevronLeft,ChevronDown } from "lucide-react";

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
             <p
              aria-label="رضایت خریداران"
              className="text-[13px]"
            >
            <span className="text-primaryBlue text-[14px] font-bold">۷۸ ٪</span> رضایت خریداران 
            </p>

            {/* User reviews */}
            <p
              aria-label="دیدگاه کاربران"
              className="flex items-center gap-1 bg-[#E0E4E6] text-text-primary text-[12px] rounded-2xl px-2 py-1 text-center"
            >
             <span>۱۰۷۰</span> دیدگاه  <ChevronLeft size={15} className="text-text-secondary"/>
            </p>
            </div>
          </div>
        </div>
        <Separator className="w-full bg-border-primary" />
        <div className="">
        <p className="text-text-primary">
            <span className="text-[15px]">ویژگی‌ها</span>
        </p>
            <div>
                <ul className="max-w-125 flex flex-wrap gap-2 items-center list-none mt-2 text-text-secondary text-[14px] space-y-1">
                    {features.map((feature, index) => (
                        <li key={index} className="bg-border-primary text-text-primary font-[11px] p-2 rounded-full ">{feature}</li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-end mt-5">
            <p className="flex items-center gap-2 text-text-primary mt-4 text-[14px] font-medium cursor-pointer">
                مشاهده همه ویژگی‌ها
                <ChevronDown size={16} />
            </p>
            </div>
        </div>
      </div>
    </>
  );
}
