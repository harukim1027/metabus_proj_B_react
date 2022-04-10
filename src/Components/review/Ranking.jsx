import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';

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
    return userData.user?.nickname;
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

  return (
    <>
      <div className="flex justify-center">
        <div className="">
          2등{' '}
          <span className="text-blue-600 text-xl font-semibold">
            {getSortedArr(userArr)[1]?.[0]}
          </span>
          님! 총{' '}
          <span className="text-red-600 text-xl font-semibold">
            {getSortedArr(userArr)[1]?.[1]}
          </span>
          번 작성!
        </div>
        <div className="mx-20">
          1등{' '}
          <span className="text-blue-600 text-xl font-semibold">
            {getSortedArr(userArr)[0]?.[0]}
          </span>
          님! 총{' '}
          <span className="text-red-600 text-xl font-semibold">
            {getSortedArr(userArr)[0]?.[1]}
          </span>
          번 작성!{' '}
        </div>
        <div className="">
          3등{' '}
          <span className="text-blue-600 text-xl font-semibold">
            {getSortedArr(userArr)[2]?.[0]}
          </span>
          님! 총
          <span className="text-red-600 text-xl font-semibold">
            {getSortedArr(userArr)[2]?.[1]}
          </span>
          번 작성!
        </div>
      </div>
      <div className="flex justify-center">
        <img src="/123.png" alt="" style={{ width: 'calc(100vw - 200px)' }} />
      </div>
    </>
  );
}

export default Ranking;
