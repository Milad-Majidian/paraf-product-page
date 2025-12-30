/**
 * Mock store product data for ProductCard component
 * Using 4 images repeated across 16 products
 */

export interface StoreProduct {
  id: number;
  storeName: string;
  storeRating: number;
  image: string;
  title: string;
  condition: string;
  timePosted: string;
  price: number;
}

const PRODUCT_IMAGES = [
  "/images/products/card/sample-product-332.svg",
  "/images/products/card/sample-product-342.svg",
  "/images/products/card/sample-product-362.svg",
  "/images/products/card/sample-product-434.svg",
];

const PRODUCT_TITLES = [
  "گوشی Apple iPhone 15 ProMax",
  "گوشی Samsung Galaxy S24 Ultra",
  "گوشی Xiaomi 14 Pro",
  "گوشی OnePlus 12",
  "گوشی Google Pixel 8 Pro",
  "گوشی Apple iPhone 14 Pro",
  "گوشی Samsung Galaxy Z Fold 5",
  "گوشی Xiaomi 13T Pro",
  "گوشی Nothing Phone 2",
  "گوشی OPPO Find X6 Pro",
  "گوشی Huawei Mate 60 Pro",
  "گوشی Realme GT 5 Pro",
  "گوشی Vivo X100 Pro",
  "گوشی Honor Magic 6 Pro",
  "گوشی Motorola Edge 50 Pro",
  "گوشی Sony Xperia 1 VI",
];

const STORE_NAMES = [
  "فروشگاه موبایل باربد",
  "فروشگاه پاسارگاد",
  "موبایل سرای تهران",
  "فروشگاه دیجی موبایل",
];

const CONDITIONS = ["آکبند", "نو", "کارکرده", "در حد نو"];

const TIME_POSTED = [
  "لحظاتی پیش",
  "۵ دقیقه پیش",
  "۳۰ دقیقه پیش",
  "۱ ساعت پیش",
  "۲ ساعت پیش",
  "امروز",
];

export const STORE_PRODUCTS: StoreProduct[] = Array.from(
  { length: 16 },
  (_, index) => ({
    id: index + 1,
    storeName: STORE_NAMES[index % STORE_NAMES.length],
    storeRating: 90 + (index % 10),
    image: PRODUCT_IMAGES[index % PRODUCT_IMAGES.length],
    title: PRODUCT_TITLES[index],
    condition: CONDITIONS[index % CONDITIONS.length],
    timePosted: TIME_POSTED[index % TIME_POSTED.length],
    price: 25000000 + index * 5000000 + (index % 3) * 1000000,
  })
);

// Simulate API delay for realistic loading
export const fetchStoreProducts = async (
  page: number = 1,
  pageSize: number = 12,
  searchQuery: string = ""
): Promise<{ products: StoreProduct[]; hasMore: boolean }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredProducts = STORE_PRODUCTS;

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredProducts = STORE_PRODUCTS.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.storeName.toLowerCase().includes(query) ||
        product.condition.toLowerCase().includes(query)
    );
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const hasMore = endIndex < filteredProducts.length;

  return {
    products: paginatedProducts,
    hasMore,
  };
};
