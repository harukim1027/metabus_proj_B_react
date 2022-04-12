import { useApiAxios } from 'api/base';
import 'react-awesome-slider/dist/styles.css';
import './SlideStyle.css';
import './HallOfFame.css';
import { useEffect, useState } from 'react';

function Fame() {
  const [help, setHelp] = useState(false);
  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/allreviews/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  //   console.log('userArr', userArr);
  //   console.log('getSortedArr', getSortedArr(userArr));

  return (
    <>
      <div>
        <div className="fame_sub_content ">
          <div className="w-full">
            <div className="flex xl:justify-end xs:justify-center"></div>
            {/* 첫번째 영역 */}
            <div className="fame_pageTop2">
              <span className=" block tracking-wide text-gray-700 xs:text-sm md:text-base font-bold mb-2">
                <div
                  className={
                    help
                      ? 'justify-center opacity-100'
                      : 'justify-center opacity-0'
                  }
                >
                  <span>명예의 전당은 다이어리&nbsp;</span>
                  <span
                    className="bg-yellow-100 font-bold"
                    style={{ 'text-decoration': 'underline' }}
                  >
                    글 작성 수
                  </span>
                  <span>로 랭킹이 정해집니다</span>
                </div>
              </span>
              <div
                className="leftBar2 fame_bar_left"
                style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
              >
                <div className="fame_bar_left flex justify-center ml-10">
                  <button
                    onClick={() => setHelp(!help)}
                    className="animate-pulse "
                  >
                    <img
                      src="/king.png"
                      alt="help"
                      className="icon_size3"
                    ></img>
                  </button>
                  <br />
                </div>
              </div>

              {/* 두번째 영역 */}
              <div>
                <div>
                  <img
                    src="/hall_of_fame2.png"
                    alt="rank1"
                    className="h-full w-full mb-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Fame;
