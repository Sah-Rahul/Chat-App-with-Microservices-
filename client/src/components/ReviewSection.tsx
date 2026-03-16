"use client";

import { useEffect, useState } from "react";
import { Star, MoreVertical } from "lucide-react";
import {
  reviewOnCourseApi,
  updateReviewOnCourseApi,
  deleteReviewOnCourseApi,
  getReviewsByCourseApi,
} from "../Api/services/review.service";
import { toast } from "sonner";
import SkeletonLoading from "./skeletonLoading";
import Loading from "./Loading";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

interface ReviewSectionProps {
  courseSlug: string;
  currentUserName: string;
}

const ReviewSection = ({ courseSlug, currentUserName }: ReviewSectionProps) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await getReviewsByCourseApi(courseSlug);
        const formattedReviews = res.data.map((r: any) => ({
          id: r._id,
          name: r.userId?.name || "Anonymous",
          rating: r.rating,
          comment: r.comment,
        }));
        setReviews(formattedReviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseSlug]);

  const submitReview = async () => {
    if (!reviewText.trim() || rating === 0) return;

    try {
      if (editingId) {
        const updated = await updateReviewOnCourseApi(editingId, {
          comment: reviewText,
          rating,
        });
        setReviews((prev) =>
          prev.map((r) =>
            r.id === editingId
              ? { ...r, comment: updated.comment, rating: updated.rating }
              : r,
          ),
        );
        setEditingId(null);
      } else {
        const newReview = await reviewOnCourseApi({
          type: "course",
          courseSlug,
          comment: reviewText,
          rating,
        });

        setReviews((prev) => [
          {
            id: newReview._id,
            name: currentUserName,
            comment: newReview.comment,
            rating: newReview.rating,
          },
          ...prev,
        ]);
      }

      setReviewText("");
      setRating(0);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to submit review:", err);
        toast.error(err.message);
      }
    }
  };

  const handleEdit = (review: Review) => {
    setReviewText(review.comment);
    setRating(review.rating);
    setEditingId(review.id);
    setMenuOpen(null);
  };

  const handleDelete = async (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setMenuOpen(null);

    try {
      await deleteReviewOnCourseApi(id);
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Reviews</h3>
      <div className="border rounded-lg p-4 mb-6">
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating ? "text-teal-500 fill-teal-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded-md p-3 mb-3"
        />

        <button
          onClick={submitReview}
          className="bg-teal-500 text-white px-4 py-2 rounded-md"
        >
          {editingId ? "Update Review" : "Submit Review"}
        </button>
      </div>

      <div className="space-y-4">
        {loading && <Loading />}
        {!loading && reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{review.name}</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={
                      star <= review.rating
                        ? "text-teal-500 fill-teal-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-2 text-sm">{review.comment}</p>
            </div>

            <div className="relative">
              <button
                className="cursor-pointer"
                onClick={() =>
                  setMenuOpen(menuOpen === review.id ? null : review.id)
                }
              >
                <MoreVertical size={18} />
              </button>

              {menuOpen === review.id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-24">
                  <button
                    onClick={() => handleEdit(review)}
                    className="block w-full text-left px-3 cursor-pointer py-2 hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="block w-full text-left px-3 cursor-pointer py-2 text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
