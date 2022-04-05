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
    // console.log('result', result);
    return result;
  }

  useEffect(() => {
    refetch();
  }, []);

  //   console.log('userArr', userArr);
  //   console.log('getSortedArr', getSortedArr(userArr));

  return (
    <>
      <div className="header flex flex-wrap justify-center mt-10">
        <div className="mx-1 review_header rounded-xl overflow-hidden xs:px-0 sm:px-20 pt-10 pb-10 my-1 w-2/3 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-5 font-semibold italic text-center text-slate-900">
            <span className="mt-7 mb-6 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-400 relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl">
              <span className="relative text-white">" 명예의 전당 "</span>
            </span>
          </blockquote>
          <div className="xs:text-xs md:text-base mb-5 text-center">
            <span>명예의 전당은 다이어리&nbsp;</span>
            <span
              className="bg-yellow-100 font-bold"
              style={{ 'text-decoration': 'underline' }}
            >
              글 작성 수
            </span>
            <span>로 랭킹이 정해집니다 😆</span>
          </div>
          <hr className="mb-5 mt-5" />
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
              bullets={false}
            >
              <h1 className="flex flex-wrap justify-center space-x-4">
                <img src="/rank1.png" alt="rank1" className="icon_size2" />
                <h1 className="font-semibold italic">
                  <h1 className="underline decoration-wavy decoration-yellow-400 text-center">
                    {getSortedArr(userArr)[0]?.[0]}
                  </h1>
                  <h2>글 작성 수 : {getSortedArr(userArr)[0]?.[1]} 회</h2>
                </h1>
              </h1>
              <h2 className="flex flex-wrap justify-center space-x-4">
                <img src="/rank2.png" alt="rank2" className="icon_size2" />
                <h1 className="font-semibold italic">
                  <h1 className="underline decoration-wavy decoration-gray-400 text-center">
                    {getSortedArr(userArr)[1]?.[0]}
                  </h1>
                  <h2>글 작성 수 : {getSortedArr(userArr)[1]?.[1]} 회</h2>
                </h1>
              </h2>

              <h3 className="flex flex-wrap justify-center space-x-4">
                <img src="/rank3.png" alt="rank3" className="icon_size2" />
                <h1 className="font-semibold italic">
                  <h1 className="underline decoration-wavy decoration-yellow-600 text-center">
                    {getSortedArr(userArr)[2]?.[0]}
                  </h1>
                  <h2>글 작성 수 : {getSortedArr(userArr)[2]?.[1]} 회</h2>
                </h1>
              </h3>
            </AwesomeSlider>
          </div>
        </div>
      </div>
    </>
  );
}
export default Fame;
