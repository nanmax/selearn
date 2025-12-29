/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { RatingGroup } from "@ark-ui/react/rating-group";
import { StarIcon, StarHalfIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { submitCourseReview } from "../actions";
import { useConstructUrl } from "@/hooks/use-construct";

export default function PopUpRating({
  courseSlug,
  onClose,
  courseInfo,
}: {
  courseSlug: string;
  courseInfo: any;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!rating) return;

    startTransition(async () => {
      const res = await submitCourseReview({
        courseSlug,
        rating,
        comment: review,
      });

      if (res.success) onClose();
    });
  };

  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="max-w-sm w-full p-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded flex items-center justify-center">
          <img
            src={useConstructUrl(courseInfo?.fileKey) ?? courseInfo?.fileKey}
            alt={courseInfo?.title}
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {courseInfo?.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {courseInfo?.description ??
              "Terima kasih telah menyelesaikan kursus ini!"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rate your experience
          </label>
          <RatingGroup.Root
            count={5}
            value={rating}
            onValueChange={(d) => setRating(d.value)}
            allowHalf
          >
            <RatingGroup.Control className="inline-flex">
              <RatingGroup.Context>
                {({ items }) =>
                  items.map((item) => (
                    <RatingGroup.Item
                      key={item}
                      index={item}
                      className="w-6 h-6 p-0.5"
                    >
                      <RatingGroup.ItemContext>
                        {({ highlighted }) =>
                          highlighted ? (
                            <StarIcon className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <StarIcon className="w-5 h-5 text-gray-300" />
                          )
                        }
                      </RatingGroup.ItemContext>
                    </RatingGroup.Item>
                  ))
                }
              </RatingGroup.Context>
            </RatingGroup.Control>
          </RatingGroup.Root>

          {rating > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {ratingLabels[Math.floor(rating) - 1]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Share your thoughts
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your experience..."
            className="w-full mt-3 text-sm border rounded p-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded"
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
