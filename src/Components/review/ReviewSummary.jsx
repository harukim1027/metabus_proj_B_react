import { Link } from 'react-router-dom';

function ReviewSummary({ review }) {
  // console.log('review:', review);

  return (
    <>
      <div className="review_header h-full">
        <Link to={`/review/${review.review_no}/`}>
          {review.review_image && (
            <div className="h-3/5 overflow-hidden">
              <img src={review.review_image?.[0]?.image} alt={review.title} />
            </div>
          )}
          <div className="px-3 py-4">
            <div className="flex justify-between">
              <h2 className="font-bold text-sm mb-2 inline">
                {review.title.length > 15
                  ? review.title.substring(0, 15) + '...'
                  : review.title}
              </h2>
              <span> ({review.comments.length})</span>
            </div>

            <div className="text-left mb-5">
              <span className="font-thin"> 글쓴이 : </span>
              <span className="font-semibold">{review.user.nickname}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
export default ReviewSummary;
