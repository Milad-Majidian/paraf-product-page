"use client";

import { Button } from "@/components/elements/Button";
import { Minus, Plus } from "lucide-react";

interface AddToCartCounterProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

/**
 * Counter component for adjusting product quantity
 * Controlled component that accepts quantity and callbacks
 */
export default function AddToCartCounter({
  quantity,
  onIncrement,
  onDecrement,
  minQuantity = 0,
  maxQuantity = 99,
}: AddToCartCounterProps) {
  const canIncrement = quantity < maxQuantity;
  const canDecrement = quantity > minQuantity;

  const handleIncrement = () => {
    if (canIncrement) {
      onIncrement();
    }
  };

  const handleDecrement = () => {
    if (canDecrement) {
      onDecrement();
    }
  };

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="تنظیم تعداد محصول"
    >
      {/* Increment button */}
      <Button
        onClick={handleIncrement}
        disabled={!canIncrement}
        aria-label="افزایش تعداد"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-secondary bg-bg-surface hover:bg-bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus size={19} className="text-text-primary" aria-hidden="true" />
      </Button>

      {/* Quantity display */}
      <output
        htmlFor="cart-counter"
        className="flex h-8 min-w-13 items-center justify-center rounded-md border border-border-secondary bg-bg-surface px-3 text-sm font-medium text-text-primary"
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </output>

      {/* Decrement button */}
      <Button
        onClick={handleDecrement}
        disabled={!canDecrement}
        aria-label="کاهش تعداد"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-secondary bg-bg-surface hover:bg-bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus size={19} className="text-text-primary" aria-hidden="true" />
      </Button>
    </div>
  );
}