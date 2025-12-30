import { formatPersianNumber } from "@/lib/formatters";
import { Bookmark, Store, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { StoreProduct } from "../mocks/storeProducts";

interface ProductCardProps {
  product: StoreProduct;
}

/**
 * Product card component displaying store product information
 * Used in grid layout for store product listings
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-bg-surface flex flex-col gap-2 p-3 hover:shadow-md transition-shadow">
      {/* Store info header */}
      <header className="flex justify-between mb-2">
        <div className="flex gap-1 items-center">
          <Store
            size={20}
            className="text-text-tertiary"
            aria-hidden="true"
          />
          <span className="text-xs text-text-secondary">
            {product.storeName}
          </span>
        </div>
        <div className="flex gap-1 items-center justify-center text-text-tertiary">
          <span className="text-[13px]">{formatPersianNumber(product.storeRating)}%</span>
          <ThumbsUp size={17} aria-hidden="true" />
        </div>
      </header>

      {/* Product image */}
      <div className="flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={158}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Product title */}
      <h3 className="text-sm text-center font-bold my-3 line-clamp-2">
        {product.title}
      </h3>

      {/* Product details */}
      <footer className="flex flex-col justify-center items-between gap-3 p-2">
        <div className="flex justify-between items-center">
          <span className="bg-bg-body text-text-primary text-[12px] rounded-2xl px-2 py-1 text-center">
            {product.condition}
          </span>
          <span className="bg-bg-body text-text-primary text-[12px] rounded-2xl px-2 py-1 text-center">
            {product.timePosted}
          </span>
        </div>

        {/* Price and bookmark */}
        <div className="flex justify-between items-center">
          <button
            aria-label="افزودن به علاقه‌مندی‌ها"
            className="text-text-tertiary hover:text-primary transition-colors"
          >
            <Bookmark size={19} />
          </button>
          <div className="flex gap-1 items-center">
            <span className="text-sm text-text-primary font-bold">
              {formatPersianNumber(product.price)}
            </span>
            <span className="text-xs text-text-secondary">تومان</span>
          </div>
        </div>
      </footer>
    </article>
  );
}
