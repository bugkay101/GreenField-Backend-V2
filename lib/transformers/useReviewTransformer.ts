interface Review {
  id: number;
  itemId: number;
  user: string;
  discription: string;
  rating: number;
  createdAt: number;
}

export const reviewTransformer = (review: any): Review => {
  return {
    id: parseInt(review.id),
    itemId: parseInt(review.itemId),
    user: review.user,
    discription: review.discription,
    rating: parseInt(review.rating),
    createdAt: parseInt(review.createdAt),
  };
};

export const calculateAverageRating = (reviews: Review[]): number => {
  if (!reviews ||reviews.length === 0 ) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

export const countRatings = (
  reviews: Review[]
): { [key: number]: number; total: number } => {
  // Initialize an object to hold the counts for each rating
  const ratingCounts: { [key: number]: number; total: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    total: 0,
  };

  // Iterate over the reviews
  for (let review of reviews) {
    // Increment the count for the review's rating
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating]++;
      ratingCounts.total++;
    }
  }

  return ratingCounts;
};

