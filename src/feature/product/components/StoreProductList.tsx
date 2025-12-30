"use client";

import { Input } from "@/components/elements/Input";
import { Ellipsis, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchStoreProducts, StoreProduct } from "../mocks/storeProducts";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const INITIAL_PAGE_SIZE = 12;

/**
 * Store product list with search and lazy loading functionality
 * Shows 12 products initially with "Load More" button
 */
export default function StoreProductList() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<StoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  // Initial load
  useEffect(() => {
    loadProducts(1, "");
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputValue !== searchQuery) {
        setSearchQuery(searchInputValue);
        setCurrentPage(1);
        loadProducts(1, searchInputValue, false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInputValue]);

  const loadProducts = async (
    page: number,
    query: string = searchQuery,
    append: boolean = false
  ) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      const result = await fetchStoreProducts(page, INITIAL_PAGE_SIZE, query);

      if (append) {
        setProducts((prev) => [...prev, ...result.products]);
        setFilteredProducts((prev) => [...prev, ...result.products]);
      } else {
        setProducts(result.products);
        setFilteredProducts(result.products);
      }

      setHasMore(result.hasMore);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    loadProducts(currentPage + 1, searchQuery, true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <section
      className="bg-bg-surface border border-border-primary rounded-xl p-4 mt-4"
      aria-label="محصولات فروشگاه"
    >
      {/* Header with title and search */}
      <header className="px-2 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-[18px] font-bold text-text-primary">
              محصولات فروشگاه باربد
          </h2>

          {/* Search input */}
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="جستجو..."
              value={searchInputValue}
              onChange={handleSearchChange}
              className="w-full h-10 pl-10 rounded-2xl border border-border-secondary bg-border-primary text-sm placeholder:text-text-tertiary"
              aria-label="جستجو در محصولات فروشگاه"
            />
          </div>
        </div>

        {/* Search results indicator */}
        {searchQuery && !isLoading && (
          <p className="text-sm text-text-secondary mt-3">
            {filteredProducts.length > 0
              ? `${filteredProducts.length} محصول یافت شد`
              : "محصولی یافت نشد"}
          </p>
        )}
      </header>

      {/* Products grid */}
      {isLoading ? (
        // Initial loading skeleton
        <div className="px-2">
          <div className="bg-border-primary p-px overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px bg-border-primary">
              {Array.from({ length: INITIAL_PAGE_SIZE }).map((_, index) => (
                <div key={index} className="bg-bg-surface p-3">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="px-2">
            <div className="bg-border-primary p-px overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px bg-border-primary">
                {/* Show all products except the last one if there are more to load */}
                {(hasMore && !isLoadingMore
                  ? filteredProducts.slice(0, -1)
                  : filteredProducts
                ).map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in bg-bg-surface"
                    style={{
                      animationDelay: `${(index % INITIAL_PAGE_SIZE) * 30}ms`,
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}

                {/* Load more button replacing the last product slot */}
                {hasMore && !isLoadingMore && (
                  <button
                    onClick={handleLoadMore}
                    className="bg-bg-surface p-4 flex flex-col items-center justify-center gap-3 hover:bg-bg-body transition-colors cursor-pointer min-h-75"
                    aria-label="بارگذاری محصولات بیشتر"
                  >
                    <Ellipsis
                      className="w-12 h-12 text-text-secondary"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-text-primary">
                      مشاهده بیشتر
                    </span>
                  </button>
                )}

                {/* Loading skeleton items while loading more */}
                {isLoadingMore && (
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={`loading-${index}`} className="bg-bg-surface p-3">
                        <ProductCardSkeleton />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Search className="w-16 h-16 text-text-tertiary mb-4" aria-hidden="true" />
          <h3 className="text-lg font-bold text-text-primary mb-2">
            محصولی یافت نشد
          </h3>
          <p className="text-sm text-text-secondary text-center">
            لطفاً عبارت دیگری را جستجو کنید
          </p>
        </div>
      )}
    </section>
  );
}