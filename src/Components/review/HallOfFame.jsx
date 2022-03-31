import { useApiAxios } from 'api/base';
import LoadingIndicator from 'LoadingIndicator';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './SlideStyle.css';
import { useEffect } from 'react';

function Fame() {
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
    console.log('result', result);
    return result;
  }

  useEffect(() => {
    refetch();
  }, []);

  //   console.log('userArr', userArr);
  //   console.log('getSortedArr', getSortedArr(userArr));

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="mx-1 review_header rounded-xl shadow-md overflow-hidden xs:px-0 sm:px-20 pt-5 pb-10 my-1 w-2/3 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-2 font-semibold italic text-center text-slate-900">
            <span className="mt-7 mb-6 before:block before:absolute before:-inset-1 before:bg-yellow-400 relative inline-block xs:text-l sm:text-xl lg:text-2xl">
              <span className="relative text-white">" 명예의 전당 "</span>
            </span>
            <h1 className="text-xs">
              명예의 전당은 다이어리 글 작성 수로 랭킹이 정해집니다.
            </h1>
          </blockquote>
          <hr />
          <div className="flex xl:justify-end xs:justify-center">
            {loading && (
              <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
            )}
            {error && (
              <>
                <p className="text-red-400 mt-1">
                  &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. ! (조회된 정보가
                  없습니다.)
                </p>
              </>
            )}
          </div>

          <div>
            <AwesomeSlider
              className="Container2"
              mobileTouch={true}
              organicArrows={true}
            >
              <h1 className="flex flex-wrap justify-center font-semibold italic xs:w-10">
                <img src="/rank1.png" alt="rank1" />
                {getSortedArr(userArr)[0]?.[0]}
                {/* <br />글 갯수:{getSortedArr(userArr)[0]?.[1]} */}
              </h1>
              <h1 className="flex flex-wrap justify-center xs:w-10 font-semibold italic">
                <img src="/rank2.png" alt="rank2" />
                {getSortedArr(userArr)[1]?.[0]}
              </h1>

              <h1 className="flex flex-wrap justify-center xs:w-10 font-semibold italic">
                <img src="/rank3.png" alt="rank3" />
                {getSortedArr(userArr)[2]?.[0]}
              </h1>
            </AwesomeSlider>
          </div>
        </div>
      </div>
    </>
  );
}
export default Fame;
