"use client";

import Image from "next/image";
import { useState } from "react";
import ProductInformation from "./ProductInformation";
import ProductPurchase from "./ProductPurchase";
import { imageCategory } from "../mocks/productImages";
import { Product } from "../types";
import StoreProductList from "./StoreProductList";

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <>
      <article className="base-container">
        <div className="bg-bg-surface border border-border-primary rounded-xl p-4 mt-4">
          {/* product Images category */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
            <div className="col-span-1">
              {/* Main Image Display */}
              <div className="border border-border-primary rounded-md overflow-hidden bg-white">
                <Image
                  src={imageCategory[selectedImage].src}
                  alt={imageCategory[selectedImage].alt}
                  width={400}
                  height={500}
                  className="object-contain w-full h-auto"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-1 mt-2">
                {imageCategory.slice(0, 3).map((image, index) => (
                  <div
                    key={image.name}
                    onClick={() => setSelectedImage(image.id)}
                    className={`col-span-1 border rounded-md overflow-hidden cursor-pointer transition-all hover:border-blue-300 ${
                      selectedImage === image.id
                        ? "border-blue-300 border"
                        : "border-border-primary"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={87}
                      height={107}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                ))}
                {imageCategory.length > 3 && (
                  <div className="col-span-1 justify-center items-center border border-border-primary rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="w-full h-full flex justify-center items-center text-sm font-medium">
                      +{imageCategory.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
             <ProductInformation />  
             <ProductPurchase product={product} />
          </div>
        </div>
        <StoreProductList />
      </article>
    </>
  );
}
