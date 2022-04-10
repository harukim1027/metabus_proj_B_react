import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ReviewSummaryMain({ userID }) {
  const [recent, setRecent] = useState();

  const [{ data: recentReviews, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/?query=${userID}`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setRecent(
      recentReviews?.results.sort((a, b) => a.created_at - b.created_at)[0],
    );
  }, [recentReviews]);
  console.log('recent: ', recent);

  return (
    <>
      <div className="">
        <div className="flex flex-wrap justify-center rounded mb-10">
          <div className="transition-transform hover:-translate-y-5 duration-300 my-5 rounded-xl mx-5 mb-3 w-44 h-60 overflow-hidden shadow-lg inline">
            <Link to={`/review/${recent?.review_no}/`}>
              {recent?.review_image && (
                <div className="bg-white h-2/3 overflow-hidden">
                  <img
                    src={recent?.review_image?.[0]?.image}
                    alt={recent?.title}
                  />
                </div>
              )}
              <div className="bg-white px-6 py-4">
                <h2 className="font-bold text-base mb-2">
                  {recent?.title.length > 7
                    ? recent?.title.substring(0, 7) + '...'
                    : recent?.title}
                </h2>
                <h3 className="text-gray-700 text-base">
                  by: {recent?.user.nickname}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default ReviewSummaryMain;
