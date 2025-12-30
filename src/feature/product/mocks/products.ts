import { Product } from "../types"


const PRODUCTS: Product[] = [
  {
    slug: "iphone-15-pro-256",
    title: "آیفون ۱۵ پرو ۲۵۶ گیگ",
    description:
      "آیفون ۱۵ پرو با طراحی تیتانیومی، نمایشگر روشن و دوربین قدرتمند. مناسب برای استفاده روزانه و تولید محتوا.",
    priceToman: 125_000_000,
    brand: "Apple",
    condition: "new",
    availability: "in_stock",
    updatedAtISO: new Date().toISOString(),
    images: [
      { src: "/images/logo/logo.svg", alt: "تصویر محصول" },
      { src: "/images/logo/logo-type.png", alt: "تصویر محصول" },
    ],
    store:"فروشگاه موبایل باربد",
    satisfactionPercent: "95%"
  },
  {
    slug: "ps5-slim",
    title: "کنسول PS5 اسلیم",
    description: "نسخه اسلیم پلی‌استیشن ۵ با عملکرد عالی و طراحی جمع‌وجور.",
    priceToman: 38_900_000,
    brand: "Sony",
    condition: "new",
    availability: "in_stock",
    updatedAtISO: new Date().toISOString(),
    images: [{ src: "/images/logo/logo.svg", alt: "تصویر محصول" }],
    store:"فروشگاه بازی کامپیوتر پارسیان"
  },
]

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const normalized = decodeURIComponent(slug).trim().toLowerCase()
  return PRODUCTS.find((p) => p.slug.toLowerCase() === normalized) ?? null
}

export function formatToman(priceToman: number): string {
  try {
    return new Intl.NumberFormat("fa-IR").format(priceToman)
  } catch {
    return String(priceToman)
  }
}
