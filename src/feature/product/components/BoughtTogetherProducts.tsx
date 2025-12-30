"use client";

import SectionCarousel from "@/components/elements/SectionCarousel";
import { STORE_PRODUCTS } from "../mocks/storeProducts";
import ProductCard from "./ProductCard";

export default function BoughtTogetherProducts() {
  return (
     <section
      className="bg-bg-surface border border-border-primary rounded-2xl p-5 mt-4"
        aria-label="کاربران در کنار این کالا خریداری کردند"
    >
    <SectionCarousel
      title="کاربران در کنار این کالا خریداری کردند"
      items={STORE_PRODUCTS}
      getKey={(product) => product.id}
      renderItem={(product) => <ProductCard product={product} />}
    />
    </section>
  );
}