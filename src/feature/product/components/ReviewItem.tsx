import { ChevronDown, Dot, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { reviews } from "../mocks/userReview";
import { Separator } from "@/components/ui/separator";

// Type inferred from the mock data shape
type Review = (typeof reviews)[number];

export function ReviewItem({ review }: { review: Review }) {
  // UI state: whether the comment is expanded/collapsed
  const [expanded, setExpanded] = useState(false);

  // DOM ref used to measure the comment's rendered height
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // Measured heights / overflow guard (controls whether we show the “more/less” button)
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Collapsed max-height (approx. 3 lines with `leading-6`)
  const COLLAPSED_HEIGHT = 72; // ~ 3 lines with `leading-6`

  // Measure comment height on mount, on comment change, and on window resize
  useEffect(() => {
    const measure = () => {
      if (!textRef.current) return;
      const nextHeight = textRef.current.scrollHeight;
      setContentHeight(nextHeight);
      setIsOverflowing(nextHeight > COLLAPSED_HEIGHT + 1);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [review.comment]);

  return (
    <article className="w-full mb-6">
      {/* Review header: author + satisfaction */}
      <header className="flex justify-between gap-2">
        <div className="flex items-center text-sm">
          <span>{review.username}</span>
          <Dot size={25} className="text-text-tertiary" aria-hidden />
          <span className="text-success text-xs">{review.identity}</span>
        </div>
        <div
          className="flex items-center gap-1 text-sm"
          aria-label="میزان رضایت"
        >
          <span>٪ {review.satisfiesPercent}</span>
          <span className="text-xs text-text-secondary">رضایت</span>
        </div>
      </header>

      {/* Review body: collapsible comment text */}
      <div className="flex flex-col items-end mt-2">
        <div
          className="w-full overflow-hidden"
          style={{
            maxHeight: expanded
              ? `${contentHeight}px`
              : `${COLLAPSED_HEIGHT}px`,
            transition: "max-height 280ms ease",
          }}
        >
          <p
            ref={textRef}
            className={`text-text-secondary text-sm leading-6 ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {review.comment}
          </p>
        </div>

        {/* Expand/collapse control (only shown when text overflows) */}
        {isOverflowing && (
          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            aria-expanded={expanded}
            className="flex gap-2 mt-2 text-sm font-medium"
          >
            {expanded ? "کمتر" : "بیشتر"}
            <ChevronDown
              size={16}
              className={
                expanded
                  ? "rotate-180 transition-transform"
                  : "transition-transform"
              }
              aria-hidden
            />
          </button>
        )}
      </div>

      {/* Review meta: helpful/unhelpful counts */}
      <div
        className="flex justify-start gap-7 my-3"
        aria-label="بازخورد این دیدگاه"
      >
        <div className="flex gap-1 items-center">
          <span className="text-sm">{review.like}</span>
          <ThumbsUp size={17} className="text-text-secondary" aria-hidden />
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-sm">{review.dislike}</span>
          <ThumbsDown size={17} className="text-text-secondary" aria-hidden />
        </div>
      </div>

      {/* Divider between reviews */}
      <Separator className="w-full bg-border-primary" />
    </article>
  );
}
