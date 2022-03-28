import TopNav from './TopNavi';
import '../../App.css';
import './MainCrew.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import useScrollFadeIn from 'hooks/useScrollFadeIn';
import AnimalList from 'Components/StreetAnimal/AnimalList';

function MainScreen() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(200);

  // 좌표를 위한 상탯값
  const [ScrollY, setScrollY] = useState(0);

  const [activeCount, setActiveCount] = useState(1);
  console.log(activeCount);

  // 스크롤 기능
  const { auth, logout } = useAuth();
  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function wheel(event) {
    // event.preventDefault();

    if (event.deltaY > 0) {
      //
      if (activeCount < 3) {
        setActiveCount((prevActiveCount) => prevActiveCount + 1);
      }
    } else {
      //
      if (activeCount > 1) {
        setActiveCount((prevActiveCount) => prevActiveCount - 1);
      }
    }
  }

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(200);
      setOpen(false);
    }
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const checkLogin = () => {
    if (auth.isLoggedIn) {
      navigate('/assignment/check/');
    } else {
      toast.info('크루원 신청을 위해서는 로그인이 필요합니다! 😓 ', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: 'font-bold text-2xl p-5',
      });
      navigate('/accounts/login/');
    }
  };

  useEffect(() => {
    gotoTop();
  }, []);

  useEffect(() => {
    console.log('ScrollY is ', ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [ScrollY]);

  //-------------

  return (
    <>
      <div></div>
      {/* 본문 시작 */}
      <div id="header_warp" onWheel={(e) => wheel(e)}>
        {/* <!-- //header_warp --> */}
        {/* <!-- 메인 --> */}
        <div className="main">
          <div className="mainContents">
            <div
              className={
                activeCount === 1
                  ? 'page section01 active_scene'
                  : 'page section01 preEle'
              }
            >
              <img
                className="xs:w-5/6 xl:w-3/5"
                src="/main_icon_dog.png"
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
                activeCount === 2
                  ? 'page section02 active_scene'
                  : 'page section02 preEle'
              }
            >
              <div className="innerCont bgLayer">
                <div className="cover"></div>
                <div className="inner">
                  <p>
                    메타버스는{' '}
                    <span>
                      <strong className="aniCount">68,724</strong>마리의
                    </span>
                    유기동물이 가족을 찾도록 돕고 있습니다.
                  </p>
                  <span className="scrollGuide">Scroll Down ▽ </span>
                </div>
              </div>
              <div className="innerCont maskLayer">
                <div className="inner">
                  <p>
                    메타버스는{' '}
                    <span>
                      <strong className="aniCount">68,724</strong>마리의
                    </span>
                    유기동물이 가족을 찾도록 돕고 있습니다.
                  </p>
                  <span className="scrollGuide">Scroll Down ▽ </span>
                </div>
              </div>
            </div>

            <div
              className={
                activeCount === 3
                  ? 'page section03 active_scene'
                  : 'page section03 preEle'
              }
            >
              <div className="innerCont bgLayer">
                <div className="top">
                  <p className="main-tit-txt">
                    메타버스에서는 <br />
                    어떤 일들을 하나요?
                  </p>
                  <a href="" className="main-link">
                    목록 보기
                  </a>
                </div>
                <div className="campaigns">
                  <div className="campaign01">
                    <strong>
                      유기동물
                      <br />
                      입양 플랫폼
                    </strong>
                  </div>
                  <div className="campaign02">
                    <strong>
                      유기동물
                      <br />
                      찾기 커뮤니티
                    </strong>
                  </div>
                  <div className="campaign03">
                    <strong>
                      유기동물
                      <br />
                      잃어버렸어요 커뮤니티
                    </strong>
                  </div>
                </div>
              </div>
              <div className="innerCont maskLayer">
                <div className="top">
                  <p className="main-tit-txt">
                    메타버스에서는 <br />
                    어떤 일들을 하나요?
                  </p>
                  <a href="" className="main-link">
                    목록 보기
                  </a>
                </div>
                <div className="campaigns">
                  <div className="campaign01">
                    <strong>
                      유기동물
                      <br />
                      입양 플랫폼
                    </strong>
                    <p>
                      <span>전국 보호소의 유기동물을</span>
                      <br />
                      <span>입양할 수 있는 플랫폼</span>
                    </p>
                  </div>
                  <div className="campaign02">
                    <strong>
                      유기동물
                      <br />
                      찾기 커뮤니티
                    </strong>
                    <p>
                      <span>동네에서 발견된 유실동물들의 </span>
                      <br />
                      <span>주인을 찾는 소통 플랫폼</span>
                    </p>
                  </div>
                  <div className="campaign03">
                    <strong>
                      유기동물 <br />
                      잃어버렸어요 커뮤니티
                    </strong>
                    <p>
                      <span>잃어버린 </span>
                      <br />
                      <span>유실동물들을 찾을 수 있는 소통 플랫폼</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- 메인 bottom --> */}
            <div className="main_bottom">
              <ul className="metabusInfo">
                <li>
                  <img src="" alt="" /> 오늘 구조된 동물{' '}
                  <strong className="data-rescue">0</strong> 마리
                </li>
                <li>
                  <img src="" alt="" /> 입양률{' '}
                  <strong className="data-adoptaion">21</strong> %
                </li>
                <li>
                  <img src="" alt="" /> 안락사율{' '}
                  <strong className="data-euthanasis">9</strong> %
                </li>
              </ul>
            </div>

            {/* <!-- goto top --> */}
            <a href="#" className="main_gotoTop">
              TOP
            </a>

            {/* <!-- main scrollbar --> */}
            <div className="mainScrollBar">
              <span
                className="thumb"
                style={
                  activeCount === 1
                    ? { top: '0%' }
                    : activeCount === 2
                    ? { top: '35%' }
                    : { top: '83%' }
                }
              ></span>
            </div>

            <div className="page_cover"></div>
          </div>
          {/* <!-- //메인 --> */}

          {/* <!-- loading --> */}

          <div id="footer">
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
