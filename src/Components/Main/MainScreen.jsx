import '../../App.css';
import './MainCrew.css';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { toast } from 'react-toastify';
import Alert from 'Components/review/Alert';
import PageAllCenterMap from 'Pages/PageMap/PageAllCenterMap';
import 'react-awesome-slider/dist/styles.css';
import '../review/SlideStyle.css';

import ReviewSummaryMain from 'Components/review/ReviewSummaryMain';
import { useApiAxios } from 'api/base';
import ReviewSummary from 'Components/review/ReviewSummary';
import PageSearchInfraMap from 'Pages/PageMap/PageSearchInfraMap';
import AwesomeSlider from 'react-awesome-slider';
import Fame from 'Components/review/HallOfFame';

function MainScreen({ activeCount, setActiveCount }) {
  // console.log(activeCount);
  const ismain = 1;

  function wheel(event) {
    // event.preventDefault();

    if (event.deltaY > 0) {
      //
      if (activeCount < 10) {
        setActiveCount((prevActiveCount) => prevActiveCount + 1);
      }
    } else {
      //
      if (activeCount > 1) {
        setActiveCount((prevActiveCount) => prevActiveCount - 1);
      }
    }
  }

  return (
    <>
      <div></div>
      {/* 본문 시작 */}
      <div id="header_warp">
        {/* <!-- //header_warp --> */}
        {/* <!-- 메인 --> */}
        <div>
          <div className="mainContents">
            <div
              className={
                activeCount >= 1 && activeCount < 5
                  ? 'page section01 active_scene'
                  : 'page section01 preEle'
              }
              onWheel={(e) => wheel(e)}
            >
              <img
                className="xs:w-5/6 xl:w-3/5"
                src="/main_dog_blue.png"
                alt=""
              />
              <div className="innerCont bgLayer">
                <div className="cover"></div>
                <div className="inner">
                  <h2>
                    Don't Buy A Family
                    <br /> Become The Family
                  </h2>
                  <p>
                    METABUS는 <br /> 사지 않고 <br />
                    가족이 되는 문화를 만듭니다.
                  </p>
                  <span className="scrollGuide">Scroll Down ▽ </span>
                </div>
              </div>

              <div className="innerCont maskLayer">
                <div className="inner">
                  <h2>
                    Don't Buy A Family
                    <br /> Become The Family
                  </h2>
                  <p>
                    METABUS는 <br />
                    사지 않고 <br />
                    가족이 되는 문화를 만듭니다.
                  </p>
                  <span className="scrollGuide">Scroll Down ▽ </span>
                </div>
              </div>
              <div className="hoverLayer"></div>
            </div>

            <div
              className={
                activeCount >= 5 && activeCount < 10
                  ? 'page section02 active_scene'
                  : 'page section02 preEle'
              }
              onWheel={(e) => wheel(e)}
            >
              <div className="flex justify-center mt-20">
                <div className="w-2/3 h-full">
                  <Fame />
                </div>
              </div>
            </div>

            <div
              className={
                activeCount === 10
                  ? 'page section03 active_scene'
                  : 'page section03 preEle'
              }
            >
              {activeCount === 10 && (
                <>
                  <div className="h-full">
                    <div className="flex flex-col justify-center h-full">
                      <div className="flex justify-center h-full">
                        <AwesomeSlider
                          className="Container w-11/12 h-5/6"
                          mobileTouch={true}
                          organicArrows={true}
                          bullets={false}
                        >
                          <span className="w-5/6 h-5/6 mt-10">
                            <div className="flex justify-center w-full">
                              <div className="w-11/12 h-full rounded-lg">
                                <PageAllCenterMap ismain={ismain} />
                              </div>
                            </div>
                          </span>
                          <span className="w-5/6 h-5/6 mt-10">
                            <div className="flex justify-center w-full">
                              <div className="w-11/12 h-full rounded-lg">
                                <PageSearchInfraMap />
                              </div>
                            </div>
                          </span>
                        </AwesomeSlider>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveCount(1)}
                      className="z-10 absolute bottom-20"
                    >
                      TOP▲
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* <!-- 메인 bottom --> */}
            <div className="main_bottom">
              <ul className="metabusInfo">
                <li>
                  <img src="" alt="" /> 현재 보호중인 동물{' '}
                  <strong className="data-rescue">4,863</strong> 마리
                </li>
                <li>
                  <img src="" alt="" /> 입양 진행률{' '}
                  <strong className="data-adoptaion">21</strong> %
                </li>
                <li>
                  <img src="" alt="" /> 입양 완료율{' '}
                  <strong className="data-euthanasis">9</strong> %
                </li>
              </ul>
            </div>

            {/* <!-- main scrollbar --> */}
            <div className="mainScrollBar">
              <span
                className="thumb"
                style={
                  activeCount >= 1 && activeCount < 5
                    ? { top: '0%' }
                    : activeCount >= 5 && activeCount < 10
                    ? { top: '35%' }
                    : { top: '83%' }
                }
              ></span>
            </div>

            <div className="page_cover"></div>
          </div>
          {/* <!-- //메인 --> */}

          {/* <!-- loading --> */}

          <div className="footer">
            <div className="foot_list">
              <ul>
                <li>
                  <a href="">메타버스 소개</a>
                </li>
                <li>
                  <a href="">이용약관</a>
                </li>
                <li>
                  <a href="">
                    <strong>개인정보처리방침</strong>
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- //foot_list --> */}
            <div className="foot_cont">
              <div className="foot_logo">
                <img src="" alt="하단로고" title="하단로고" />{' '}
              </div>
              {/* <!-- //foot_logo --> */}
              <div className="foot_info">
                <address>
                  <strong>메타버스</strong>
                  <span>대전 지식산업센터 403호</span>
                </address>
                <div className="foot_info_list">
                  <dl>
                    <dt>개인정보관리자 :</dt>
                    <dd> 메타버스 </dd>
                  </dl>
                </div>
                <div className="foot_info_list">
                  <dl>
                    <dt>메일 :</dt>
                    <dd>metabusemail@gmail.com</dd>
                  </dl>
                </div>

                <p className="copyright">
                  copyright. 2022. <strong>metabusemail@gmail.com</strong>. All
                  rights reserved.
                </p>
              </div>
              {/* <!-- //foot_info --> */}
            </div>
            {/* <!-- //foot_cont --> */}
            <div className="foot_certify">
              <span></span>
              <span></span>
            </div>
            {/* <!-- //foot_certify --> */}
          </div>
          {/* <!-- //footer --> */}
        </div>
        {/* <!-- //footer_wrap --> */}
      </div>
    </>
  );
}

export default MainScreen;
