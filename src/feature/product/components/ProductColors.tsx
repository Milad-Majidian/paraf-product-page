"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

type Color = {
  id: number;
  name: string;
  title: string;
  colorCode: string;
};

const colors: Color[] = [
  {
    id: 1222,
    name: "black",
    title: "مشکی",
    colorCode: "#222222",
  },
  {
    id: 23222,
    name: "red",
    title: "قرمز",
    colorCode: "#FF6060",
  },
  {
    id: 23212,
    name: "lemonGreen",
    title: "سبز لیمویی",
    colorCode: "#DFE517",
  },
  {
    id: 23214,
    name: "lightgray",
    title: "خاکستری روشن",
    colorCode: "#D9D9D9",
  },
];

export default function ProductColors() {
  const [selectedColorId, setSelectedColorId] = useState<number>(1222);

  const selectedColor = colors.find((c) => c.id === selectedColorId);

  return (
    <>
    <div className="mt-4">
      <p className="text-text-primary mb-2">
        رنگ‌ ها: <span className="text-[13px]">{selectedColor?.title}</span>
      </p>
      <div className="flex items-center gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => setSelectedColorId(color.id)}
            className={cn(
              "bg-bg-surface w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
              selectedColorId === color.id
                ? "border-primary"
                : "border-border-primary"
            )}
            aria-label={`انتخاب رنگ ${color.title}`}
          >
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full"
              style={{ backgroundColor: color.colorCode }}
            >
              {selectedColorId === color.id && (
                <Check size={16} className="text-white" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
    </>
  );
}
