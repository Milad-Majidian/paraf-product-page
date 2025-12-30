"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { reviews } from "../mocks/userReview";
import { ReviewItem } from "./ReviewItem";

export default function UserReview() {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);
  const canToggleShowAll = reviews.length > 2;

  return (
    <section className="mt-4" aria-labelledby="user-reviews-heading">
      <h2 id="user-reviews-heading" className="sr-only">
        دیدگاه خریداران
      </h2>

      <ul className="flex flex-col justify-start items-end">
        {visibleReviews.map((review) => (
          <li key={review.id} className="w-full">
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>

      {canToggleShowAll && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll} 
          className="flex items-center justify-end gap-2 text-text-primary mt-4 text-xs font-medium w-full cursor-pointer"
        >
          {showAll ? "بستن دیدگاه‌ها" : "مشاهده همه دیدگاه‌ها"}
          <ChevronDown
            size={16}
            className={
              showAll
                ? "rotate-180 transition-transform"
                : "transition-transform"
            }
            aria-hidden
          />
        </button>
      )}
    </section>
  );
}
