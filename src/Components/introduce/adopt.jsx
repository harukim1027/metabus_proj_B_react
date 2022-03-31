import SignPad from 'Components/Assignment/SignPad';
import useScrollFadeIn from 'hooks/useScrollFadeIn';
import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import '../../App.css';
import './Introduce.css';

// 소개 페이지 - 사진만 출력
function InfoAnimal() {
  // 스크롤 기능
  const [isOpen, setOpen] = useState(0);

  const [clickImg, setClickImg] = useState(0);
  const animatedItem = {
    0: useScrollFadeIn('left', 1, 0),
    1: useScrollFadeIn('right', 1, 0.2),
    2: useScrollFadeIn('right', 1, 0.3),
    3: useScrollFadeIn('right', 1, 0.4),
    4: useScrollFadeIn('right', 1, 0.5),
  };
  console.log(animatedItem);
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, []);

  // 스크롤 기능에 따라 변환
  const [activeCount, setActiveCount] = useState(1);
  console.log(activeCount);

  const handleClick = () => {
    setOpen((prev) => prev + 1);
  };

  const clickImgIcon = () => {
    setClickImg((prev) => prev + 1);
  };
  console.log(clickImg);

  function wheel(event) {
    // event.preventDefault();

    if (event.deltaY > 0) {
      //
      if (activeCount < 20) {
        setActiveCount((prevActiveCount) => prevActiveCount + 1);
      }
    } else {
      //
      if (activeCount > 1) {
        setActiveCount((prevActiveCount) => prevActiveCount - 1);
      }
    }
  }

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    gotoTop();
  }, [topLocation]);

  //------------- 아직 클릭 하면 옆으로 가는 거 하는 중 -> 버튼 클릭 시 옆의 이미지로 스무~스 하게 넘어가는거 구현해보기

  return (
    <>
      <div
        className="flex justify-center"
        id="topLoc"
        onWheel={(e) => wheel(e)}
      >
        <div className="flex justify-center overflow-hidden md:px-10 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <div className="introduce_header shadow-md flex flex-wrap justify-center w-full">
            <div>
              <AwesomeSlider className="Container">
                <button onClick={clickImgIcon}> ▷ </button>
                {clickImg === 1 ? (
                  <img
                    src="/safe_info1.png"
                    alt="info1"
                    className="xs:w-3/4  lg:w-3/4  xl:w-full"
                  />
                ) : clickImg === 2 ? (
                  <img
                    src="/safe_info2.png"
                    alt="info1"
                    className="xs:w-3/4  lg:w-3/4  xl:w-full"
                  />
                ) : clickImg === 3 ? (
                  <img
                    src="/safe_info3.png"
                    alt="info1"
                    className="xs:w-3/4  lg:w-3/4  xl:w-full"
                  />
                ) : clickImg === 4 ? (
                  <img
                    src="/safe_info4.png"
                    alt="info1"
                    className="xs:w-3/4  lg:w-3/4  xl:w-full"
                  />
                ) : (
                  <img
                    src="/safe_info5.png"
                    alt="info1"
                    className="xs:w-3/4  lg:w-3/4  xl:w-full"
                  />
                )}
              </AwesomeSlider>
            </div>

            {/* 첫 글 시작 영역
            <div className="transition duration-500 delay-150 md:delay-0  mt-10 mb-10 flex justify-center ">
              <button onClick={clickImgIcon}> ▷ </button>
              {clickImg === 1 ? (
                <img
                  src="/safe_info1.png"
                  alt="info1"
                  className="xs:w-3/4  lg:w-3/4  xl:w-full"
                />
              ) : clickImg === 2 ? (
                <img
                  src="/safe_info2.png"
                  alt="info1"
                  className="xs:w-3/4  lg:w-3/4  xl:w-full"
                />
              ) : clickImg === 3 ? (
                <img
                  src="/safe_info3.png"
                  alt="info1"
                  className="xs:w-3/4  lg:w-3/4  xl:w-full"
                />
              ) : clickImg === 4 ? (
                <img
                  src="/safe_info4.png"
                  alt="info1"
                  className="xs:w-3/4  lg:w-3/4  xl:w-full"
                />
              ) : (
                <img
                  src="/safe_info5.png"
                  alt="info1"
                  className="xs:w-3/4  lg:w-3/4  xl:w-full"
                />
              )}
            </div> */}

            <br />
            <br />
            {/* 두번째 글 시작 영역 */}
            <div
              {...(activeCount <= 2 ? { ...animatedItem[1] } : '')}
              className="transition duration-500 delay-150 md:delay-0  mt-10 mb-10 text-left mx-20 "
            >
              <img
                src="/safe_info2.png"
                alt="info2"
                className="xs:w-full sm:w-full lg:w-3/4  xl:w-full"
              />
            </div>

            {/* 세번째 글 시작 영역 */}
            <div
              {...(activeCount <= 4 ? { ...animatedItem[2] } : '')}
              className="transition duration-300 delay-150 md:delay-0  mt-10 mb-10 text-left mx-20 "
            >
              <img
                src="/safe_info3.png"
                alt="info3"
                className="xs:w-full sm:w-full lg:w-3/4  xl:w-full"
              />{' '}
            </div>

            <div
              {...(activeCount <= 5 ? { ...animatedItem[3] } : '')}
              className="transition duration-300 delay-150 md:delay-0  mt-10 mb-10 mx-10  flex flex-wrap justify-center"
            >
              <img
                src="/safe_info4.png"
                alt="info4"
                className="xs:w-3/4  lg:w-3/4"
              />
            </div>

            {/* 마지막 문단 영역 */}
            <div
              {...(activeCount <= 7 ? { ...animatedItem[4] } : '')}
              className="transition duration-300 delay-150 md:delay-0  mt-10 mb-10 text-left mx-20 "
            >
              <img
                src="/safe_info5.png"
                alt="info5"
                className="xs:w-full sm:w-full lg:w-3/4  xl:w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="mb-5  hover:animate-bounce rounded-lg text-5xl"
          onClick={() => goTop()}
        >
          🔝
        </button>
      </div>
    </>
  );
}
export default InfoAnimal;
