"use client";

interface ProductRatingProps {
  rating: number;
  totalReviews?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function ProductRating({
  rating,
  totalReviews = 0,
  size = "md",
  showCount = true,
}: ProductRatingProps) {
  // Tính số sao đầy và sao nửa
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Xác định kích thước của sao
  const starSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size];

  // Tạo mảng các sao để render
  const stars = [];

  // Thêm sao đầy
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        className={`${starSize} text-yellow-400`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 15.585l-5.93 3.117 1.13-6.59-4.798-4.679 6.633-.964L10 0l2.965 6.469 6.633.964-4.798 4.679 1.13 6.59z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  // Thêm sao nửa nếu có
  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        className={`${starSize} text-yellow-400`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <defs>
          <linearGradient id="halfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#D1D5DB" />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          d="M10 15.585l-5.93 3.117 1.13-6.59-4.798-4.679 6.633-.964L10 0l2.965 6.469 6.633.964-4.798 4.679 1.13 6.59z"
          clipRule="evenodd"
          fill="url(#halfGradient)"
        />
      </svg>
    );
  }

  // Thêm sao trống
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        className={`${starSize} text-gray-300`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 15.585l-5.93 3.117 1.13-6.59-4.798-4.679 6.633-.964L10 0l2.965 6.469 6.633.964-4.798 4.679 1.13 6.59z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center">{stars}</div>
      {showCount && totalReviews > 0 && (
        <span
          className={`ml-2 text-gray-500 ${
            size === "sm" ? "text-xs" : "text-sm"
          }`}
        >
          ({totalReviews} đánh giá)
        </span>
      )}
    </div>
  );
}
