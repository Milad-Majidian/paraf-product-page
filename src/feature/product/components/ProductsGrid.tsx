import { memo } from "react";
import { StoreProduct } from "../mocks/storeProducts";
import ProductCard from "./ProductCard";
import { Ellipsis } from "lucide-react";
import ProductCardSkeleton from "./ProductCardSkeleton";
const INITIAL_PAGE_SIZE = 12;


export const ProductsGrid = memo(function ProductsGrid({
  products,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: {
  products: StoreProduct[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}) {
  return (
    <div className="px-2">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0 ml-px mt-px">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in bg-bg-surface border border-border-primary -ml-px -mt-px"
            style={{
              animationDelay: `${(index % INITIAL_PAGE_SIZE) * 30}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}

        {hasMore && !isLoadingMore && (
          <button
            onClick={onLoadMore}
            className="bg-bg-surface border border-border-primary -ml-px -mt-px p-4 flex flex-col items-center justify-center gap-3 hover:bg-bg-body transition-colors cursor-pointer min-h-75"
            aria-label="بارگذاری محصولات بیشتر"
          >
            <Ellipsis className="w-12 h-12 text-text-secondary" aria-hidden="true" />
            <span className="text-sm font-medium text-text-primary">مشاهده بیشتر</span>
          </button>
        )}

        {isLoadingMore &&
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`loading-${index}`}
              className="bg-bg-surface border border-border-primary -ml-px -mt-px p-3"
            >
              <ProductCardSkeleton />
            </div>
          ))}
      </div>
    </div>
  );
});
