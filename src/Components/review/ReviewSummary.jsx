import { Link } from 'react-router-dom';

function ReviewSummary({ review }) {
  // console.log('review:', review);

  return (
    <>
      <div className="review_header h-full">
        <Link to={`/review/${review.review_no}/`}>
          {review.review_image && (
            <div className="h-2/3 overflow-hidden">
              <img src={review.review_image?.[0]?.image} alt={review.title} />
            </div>
          )}
          <div className="px-6 py-4">
            <h2 className="font-bold text-base mb-2">
              {review.title.length > 7
                ? review.title.substring(0, 7) + '...'
                : review.title}
            </h2>
            <h3 className="text-gray-700 text-base">
              by: {review.user.nickname}
            </h3>
          </div>
        </Link>
      </div>
    </>
  );
}
export default ReviewSummary;
