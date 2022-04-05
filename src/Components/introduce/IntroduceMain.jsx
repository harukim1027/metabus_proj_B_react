import useScrollFadeIn from 'hooks/useScrollFadeIn';
import React, { useEffect, useState } from 'react';
import '../../App.css';
import './Introduce.css';

// 소개 페이지 - 사진만 출력
function IntroduceMain() {
  // 스크롤 기능

  const animatedItem = {
    0: useScrollFadeIn('down', 1, 0),
    1: useScrollFadeIn('down', 1, 0.2),
    2: useScrollFadeIn('down', 1, 0.3),
    3: useScrollFadeIn('down', 1, 0.4),
    4: useScrollFadeIn('down', 1, 0.5),
    5: useScrollFadeIn('down', 1, 0.6),
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

  //-------------

  return (
    <>
      <div id="container">
        <div id="contents">
          <div className="sub_content">
            <div className="pageTop">
              <div class="tit">
                <h2
                  style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
                >
                  METABUS 소개
                </h2>
                <p
                  style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
                >
                  ABOUT METABUS
                </p>
              </div>
              {/* 첫번재 영역 */}
              <div
                className="leftBar"
                {...animatedItem[0]}
                style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
              ></div>

              {/* 두번째 영역 */}
              <div
                className="rightBar"
                {...animatedItem[1]}
                style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
              >
                <img
                  src="/pet-hand-orange1.png"
                  alt=""
                  style={{ opacity: 1 }}
                />
              </div>
            </div>
          </div>
          <div className="board_top_info :before">
            <div className="info_desc">
              <p className="text-right">
                메타버스는 <br />
                사지 않고 가족이 되는 문화를 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex justify-center"
        id="topLoc"
        onWheel={(e) => wheel(e)}
      >
        <div className="flex justify-center overflow-hidden md:px-10 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <div className="introduce_header flex flex-wrap justify-center w-full">
            {/* 팀 소개 및 비전 영역 */}

            {/* <div className="mt-10  flex justify-center">
              <img
                src="/introduce1.png"
                alt="introduce"
                className="xs:w-full sm:w-full lg:w-3/4  xl:w-full"
              />
            </div> */}

            {/* 첫 글 시작 영역 */}
            <div
              {...(activeCount === 2
                ? { ...animatedItem[0] }
                : { ...animatedItem[0] })}
              className="transition duration-500 delay-150 md:delay-0  mt-10 mb-10 text-left "
            >
              <span className="lg:text-4xl md:text-2xl sm:text-xl xs:text-base text-blue-900 font-bold">
                " &nbsp;
              </span>
              <span className="lg:text-xl md:text-xl sm:text-base xs:text-sm">
                인간과 동물의 관계를 떠나, <br />
              </span>

              <span className="lg:text-4xl md:text-2xl sm:text-xl xs:text-base text-blue-900 font-bold">
                모든 생명은 생명자체로서, <br />
              </span>

              <span className="lg:text-4xl md:text-2xl sm:text-xl xs:text-base text-blue-900 font-bold">
                보호받고 존중받을 권리
              </span>

              <span className="lg:text-xl md:text-xl sm:text-base xs:text-sm">
                가 있습니다.
              </span>
              <span className="lg:text-4xl md:text-2xl sm:text-xl xs:text-base text-blue-900 font-bold">
                " &nbsp; <br />
              </span>
            </div>

            <br />
            <br />
            {/* 두번째 글 시작 영역 */}
            <div
              {...(activeCount <= 2 ? { ...animatedItem[1] } : '')}
              className="transition duration-500 delay-150 md:delay-0  mt-10 mb-10 text-left mx-20 "
            >
              <br />
              <hr className="mb-10" />
              <span className="lg:text-xl md:text-xl sm:text-base xs:text-sm">
                현재, 1인 가구의 증가, 저출산·고령화 등으로 인해 <br />
                <br />
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                반려동물과 함께하는 인구의 증가와 <br />
              </span>
              <br />
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                관련 산업의 지속적인 성장 추세에 있으며, <br />
              </span>
              <br />
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                동물보호의 관점이 <br />
              </span>
              <br />
              <span className="mt-5 mb-5 lg:text-2xl md:text-xl sm:text-xl xs:text-base bg-red-200  font-bold">
                "소유 물건"
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                에서
              </span>
              <span className="mt-5 mb-5 lg:text-2xl md:text-xl sm:text-xl xs:text-base bg-yellow-200  font-bold">
                "보호해야 할 생명체로 전환"
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                으로 <br />
                <br /> 변환되면서, <br />
              </span>
              <br />
              <span className="mt-5 mb-5 lg:text-2xl md:text-xl sm:text-xl xs:text-base bg-yellow-200  font-bold">
                반려동물에 대한 윤리적인 요구가 증가
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                되고 있습니다.
              </span>
            </div>

            {/* 세번째 글 시작 영역 */}
            <div
              {...(activeCount <= 4 ? { ...animatedItem[2] } : '')}
              className="transition duration-300 delay-150 md:delay-0  mt-10 mb-10 text-left mx-20 "
            >
              <hr className="mb-10" />
              <span className="lg:text-4xl md:text-2xl text-red-600 font-extrabold">
                그러나, <br />
                <br />
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                정부와 지자체의 관련 예산 확대, 여러 정책에도 불구하고 <br />
              </span>
              <br />
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                유실·유기 동물 발생은 여전히 증가추세에 있으며 <br />
              </span>
              <br />
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                특히&nbsp;
              </span>
              <span className="mt-5 mb-5 lg:text-2xl md:text-xl sm:text-xl xs:text-base bg-red-200  font-bold">
                비품종견들의 유기
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                가 현저하게&nbsp;
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm text-red-600 font-semibold">
                높은 비율
              </span>
              <span className="mt-5 mb-5 lg:text-xl md:text-xl sm:text-base xs:text-sm">
                로 <br /> <br /> 나타나고 있는 실정입니다. <br />
              </span>
            </div>

            {/* 그래프 영역 */}
            <div
              {...(activeCount <= 5 ? { ...animatedItem[3] } : '')}
              className="transition duration-300 delay-150 md:delay-0  mt-10 mb-10 mx-10  flex flex-wrap justify-center"
            >
              <img
                src="/graph.png"
                alt="introduce"
                className="xs:w-3/4  lg:w-3/4"
              />
            </div>

            {/* 마지막 문단 영역 */}
            <div
              {...(activeCount <= 7 ? { ...animatedItem[4] } : '')}
              className="transition duration-300 delay-150 md:delay-0  mt-10 mb-10 text-left mx-20 "
            >
              <span className="lg:text-xl md:text-xl sm:text-base xs:text-sm">
                저희&nbsp;
              </span>
              <span className="lg:text-2xl md:text-xl sm:text-xl xs:text-base text-blue-900 font-bold">
                <i>METABUS</i> 팀은, <br />
              </span>
              <br />
              <span className="lg:text-2xl md:text-xl sm:text-xl xs:text-base text-blue-900 font-bold">
                품종, 비품종 동물들 모두&nbsp;&nbsp;
              </span>

              <span className="lg:text-xl md:text-xl sm:text-base xs:text-sm">
                인도적인 대우를 받고,
              </span>
              <br />
              <br />
              <span className="lg:text-xl md:text-xl sm:text-base xs:text-sm">
                삶의 터전을 잃은 유기 동물들의 수를 줄여나감으로써
              </span>
              <br />
              <br />

              <span
                style={{ textDecoration: 'underline' }}
                className="lg:text-2xl md:text-xl sm:text-xl xs:text-base text-blue-900 font-bold"
              >
                인간과 동물이 "다같이" <br />
              </span>
              <span
                style={{ textDecoration: 'underline' }}
                className="lg:text-2xl md:text-xl sm:text-xl xs:text-base text-blue-900 font-bold"
              >
                삶의 터전을 이루어 살아가는 것을 목표&nbsp;
              </span>
              <span className="lg:text-xl md:text-xl sm:text-base xs:text-sm">
                로 합니다. <br />
              </span>
            </div>

            {/* 마지막 사진 영역 */}
            <div
              {...(activeCount <= 8 ? { ...animatedItem[5] } : '')}
              className="transition duration-300 delay-150 md:delay-0  mt-10 mb-10  flex flex-wrap justify-center"
            >
              <img
                src="/introduce3.png"
                alt="introduce"
                className="xs:w-2/3 lg:w-3/4"
              />
              <br />
              <span className="mt-5 sm:text-base xs:text-sm text-gray-400">
                Copyright (c) 2022. YoonaKim All rights Reserved.
              </span>
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
export default IntroduceMain;
