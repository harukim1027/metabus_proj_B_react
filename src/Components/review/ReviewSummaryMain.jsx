import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';

function ReviewSummaryMain() {
  // console.log('review:', review);

  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  console.log(reviewList);

  return (
    <>
      <div className="review_header h-full">
        <div className="flex flex-wrap justify-center rounded mb-20 mt-10">
          {reviewList?.results?.map((review) => (
            <div
              key={review.review_no}
              className="transition-transform hover:-translate-y-5 duration-300 my-5 rounded-xl mx-5 mb-3 w-44 h-60 overflow-hidden shadow-lg inline"
            >
              <Link to={`/review/${reviewList.review_no}/`}>
                {reviewList.review_image && (
                  <div className="h-2/3 overflow-hidden">
                    <img
                      src={reviewList.review_image?.[0]?.image}
                      alt={reviewList.title}
                    />
                  </div>
                )}
                <div className="px-6 py-4">
                  <h2 className="font-bold text-base mb-2">
                    {reviewList.title.length > 7
                      ? reviewList.title.substring(0, 7) + '...'
                      : reviewList.title}
                  </h2>
                  <h3 className="text-gray-700 text-base">
                    by: {reviewList.user.nickname}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ReviewSummaryMain;
