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
      <h2 className="bg-white mb-20">
        입양 다이어리 최다 작성자{' '}
        <h2 className="text-xl font-extrabold text-red-400 inline bg-yellow-100">
          TOP3
        </h2>{' '}
        입니다!
      </h2>
      {getSortedArr(userArr)[0] ? (
        <>
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
        </>
      ) : (
        <div className="my-auto">
          <img
            src="/imogi.png"
            alt="놀란 얼굴"
            style={{ width: 'auto' }}
            className="mx-80"
          />
          <h2 className="text-2xl font-bold mb-10">
            앗 ! 아직 다이어리를 작성하신 분이 없어요 ..
          </h2>
          <h2 className="mb-40">
            다이어리를 작성하고{' '}
            <h2 className="text-2xl font-semibold text-red-500">1위</h2>의
            자리에 올라보세요!
          </h2>
        </div>
      )}{' '}
      <div className=" relative flex justify-center -top-40 -z-10">
        <img src="/123.png" alt="" style={{ width: 'auto' }} />
      </div>
    </>
  );
}

export default Ranking;
