import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import ReviewSummaryMain from './ReviewSummaryMain';

function Ranking() {
  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/allreviews/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  // 1. userID 정렬
  const userArr = reviewList?.map((userData) => {
    return userData.user?.userID;
  });
  function getSortedArr(array) {
    // 2. 출연 빈도
    const counts = array?.reduce((pv, cv) => {
      pv[cv] = (pv[cv] || 0) + 1;
      return pv;
    }, []);

    // console.log('counts', counts);
    // 3. 개수 배열
    const result = [];
    for (const key in counts) {
      result.push([key, counts[key]]);
    }
    // 4. 내림차순
    result
      .sort((first, second) => {
        return second[1] - first[1];
      })
      .slice(0, 2);
    // console.log('result', result);
    return result;
  }

  useEffect(() => {
    refetch();
  }, []);

  reviewList &&
    getSortedArr(userArr)[0] &&
    console.log(getSortedArr(userArr)[0][0]);
  return (
    <>
      <h2 className="mb-20">
        현재 입양자 중 다이어리 작성{' '}
        <h2 className="text-xl font-bold text-red-400 inline">TOP3</h2> 입니다!
      </h2>
      {reviewList && (
        <div className="flex justify-center mx-20">
          <div className="mt-24">
            2등{' '}
            <span className="text-blue-600 text-xl font-semibold">
              {getSortedArr(userArr)[1]?.[0]}
            </span>
            님! 총{' '}
            <span className="text-red-600 text-xl font-semibold">
              {getSortedArr(userArr)[1]?.[1]}
            </span>
            번 작성!
            {reviewList && getSortedArr(userArr)[1] && (
              <ReviewSummaryMain userID={getSortedArr(userArr)[1][0]} />
            )}
          </div>
          <div className="">
            1등{' '}
            <span className="text-blue-600 text-xl font-semibold">
              {getSortedArr(userArr)[0]?.[0]}
            </span>
            님! 총{' '}
            <span className="text-red-600 text-xl font-semibold">
              {getSortedArr(userArr)[0]?.[1]}
            </span>
            번 작성!
            {reviewList && getSortedArr(userArr)[0] && (
              <ReviewSummaryMain userID={getSortedArr(userArr)[0][0]} />
            )}
          </div>
          <div className="mt-32">
            3등{' '}
            <span className="text-blue-600 text-xl font-semibold">
              {getSortedArr(userArr)[2]?.[0]}
            </span>
            님! 총
            <span className="text-red-600 text-xl font-semibold">
              {getSortedArr(userArr)[2]?.[1]}
            </span>
            번 작성!
            {reviewList && getSortedArr(userArr)[2] && (
              <ReviewSummaryMain userID={getSortedArr(userArr)[2][0]} />
            )}
          </div>
        </div>
      )}
      <div className=" relative flex justify-center bottom-44 -z-10">
        <img src="/123.png" alt="" style={{ width: 'auto' }} />
      </div>
    </>
  );
}

export default Ranking;
