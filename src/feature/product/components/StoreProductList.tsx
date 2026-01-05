"use client";

import { Input } from "@/components/elements/Input";
import { Search } from "lucide-react";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchStoreProducts, StoreProduct } from "../mocks/storeProducts";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useDebouncedValue } from "@/common/hooks/useDebouncedValue";
import { ProductsGrid } from "./ProductsGrid";

const INITIAL_PAGE_SIZE = 12;

type LoadingState = "initial" | "more" | "idle";

/**
 * Store product list with search and lazy loading functionality
 * Shows 12 products initially with "Load More" button
 */
export default function StoreProductList() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("initial");
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedQuery = useDebouncedValue(searchInputValue, 500);

  const latestRequestIdRef = useRef(0);

  /**
   * Fetch a page of store products and update component state.
   *
   * Uses an incrementing request id (latestRequestIdRef) to ignore
   * out-of-order/stale responses from previous requests. Sets loadingState
   * to "initial" when replacing the list and to "more" when appending
   * additional pages.
   *
   * On success:
   * - mode === "replace": replace the current product list with the fetched
   *   products
   * - mode === "append": append the fetched products to the current list
   *
   * Updates hasMore and currentPage based on the result. Ensures loadingState
   * is set back to "idle" only if the completed request is still the latest.
   * Logs any errors to the console.
   *
   * @param page - 1-based page number to fetch
   * @param query - search query to filter products
   * @param mode - "replace" to replace the list, "append" to add to it
   */
  const loadProducts = useCallback(
    async (page: number, query: string, mode: "replace" | "append") => {
      const requestId = ++latestRequestIdRef.current;

      setLoadingState(mode === "append" ? "more" : "initial");

      try {
        const result = await fetchStoreProducts(page, INITIAL_PAGE_SIZE, query);

        if (requestId !== latestRequestIdRef.current) {
          return;
        }

        setProducts((prev) =>
          mode === "append" ? [...prev, ...result.products] : result.products
        );

        setHasMore(result.hasMore);
        setCurrentPage(page);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        if (requestId === latestRequestIdRef.current) {
          setLoadingState("idle");
        }
      }
    },
    []
  );

  // Load (and reload) whenever the debounced query changes.
  useEffect(() => {
    loadProducts(1, debouncedQuery, "replace");
  }, [debouncedQuery, loadProducts]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || loadingState === "more") {
      return;
    }
    loadProducts(currentPage + 1, debouncedQuery, "append");
  }, [currentPage, debouncedQuery, hasMore, loadProducts, loadingState]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  }, []);

  const isLoading = loadingState === "initial";
  const isLoadingMore = loadingState === "more";

  const productsForGrid = useMemo(() => {
    // Keep existing UX: reserve the last slot for the "load more" tile.
    if (hasMore && !isLoadingMore) {
      return products.slice(0, -1);
    }
    return products;
  }, [hasMore, isLoadingMore, products]);

  return (
    <section
      className="bg-bg-surface border border-border-primary rounded-2xl p-4 mt-4"
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
        {debouncedQuery && !isLoading && (
          <p className="text-sm text-text-secondary mt-3">
            {products.length > 0
              ? `${products.length} محصول یافت شد`
              : "محصولی یافت نشد"}
          </p>
        )}
      </header>

      {/* Products grid */}
      {isLoading ? (
        // Initial loading skeleton
        <div className="px-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0 ml-px mt-px">
            {Array.from({ length: INITIAL_PAGE_SIZE }).map((_, index) => (
              <div
                key={index}
                className="bg-bg-surface border border-border-primary -ml-px -mt-px p-3"
              >
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ) : products.length > 0 ? (
        <>
          <ProductsGrid
            products={productsForGrid}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
          />
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