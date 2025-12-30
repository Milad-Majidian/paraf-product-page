import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

// Import product data
const PRODUCTS = [
  {
    slug: "iphone-15-pro-256",
    title: "آیفون ۱۵ پرو ۲۵۶ گیگ",
    description:
      "آیفون ۱۵ پرو با طراحی تیتانیومی، نمایشگر روشن و دوربین قدرتمند. مناسب برای استفاده روزانه و تولید محتوا.",
    priceToman: 125_000_000,
  },
  {
    slug: "ps5-slim",
    title: "کنسول PS5 اسلیم",
    description: "نسخه اسلیم پلی‌استیشن ۵ با عملکرد عالی و طراحی جمع‌وجور.",
    priceToman: 38_900_000,
  },
];

function formatToman(price: number): string {
  try {
    return new Intl.NumberFormat("fa-IR").format(price);
  } catch {
    return String(price);
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-surface">
      <main className="base-container py-12">
        {/* Welcome Section */}
        <section className="mb-12 text-center">
          <div className="mx-auto mb-6 flex justify-center">
            <Image
              src="/images/logo/logo.svg"
              alt="Paraf Logo"
              width={120}
              height={50}
              className="object-contain"
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-text-primary">
            خوش آمدید به پاراف
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            برای مشاهده جزئیات محصول، روی هر کارت کلیک کنید
          </p>
          <p className="mt-2 text-sm text-text-tertiary">
            Click on any product card to view the detailed product page
          </p>
        </section>

        {/* Products Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            محصولات موجود
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="group"
              >
                <Card className="h-full border border-border-primary bg-bg-body p-6 transition-all hover:shadow-lg hover:border-primary">
                  <article>
                    <header className="mb-4">
                      <h3 className="mb-2 text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {product.description}
                      </p>
                    </header>

                    <div className="mt-6 flex items-center justify-between border-t border-border-primary pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-text-primary">
                          {formatToman(product.priceToman)}
                        </span>
                        <span className="text-sm text-text-secondary">
                          تومان
                        </span>
                      </div>
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        مشاهده محصول ←
                      </span>
                    </div>
                  </article>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links for Interviewer */}
        <section className="mt-12 rounded-lg border border-border-secondary bg-bg-body p-6">
          <h3 className="mb-4 text-lg font-bold text-text-primary">
            🔗 Direct Links (for quick access)
          </h3>
          <div className="flex flex-col gap-2">
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="text-primary hover:underline"
              >
                /product/{product.slug}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
