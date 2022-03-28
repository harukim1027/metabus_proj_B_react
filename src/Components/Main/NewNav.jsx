import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './TopNavi.css';

function NewNav() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* 본문 시작 */}
      <div id="header_warp">
        {/* <!-- 헤더 : 공통 --> */}
        <header className="main_header">
          {/* <h1 className="logo">
            <img src="metabusBnormal.png" alt="" />
          </h1> */}

          <button
            type="button"
            onClick={() => handleClick()}
            className="btn-open-gnb"
          >
            <img
              className="hover:scale-110 duration-200"
              src="/sidemenuicon3.png"
              alt="button"
            ></img>
          </button>
        </header>

        {/* <!-- 전체메뉴 : 공통 --> */}

        {/* 버튼 열린 상태  */}
        {isOpen ? (
          <>
            <div
              className="menuAnimationLayer"
              style={{ transform: 'matrix(6000, 0, 0, 6000, 0, 0)' }}
            ></div>

            <div
              className="menuLayer"
              style={{
                visibility: 'inherit',
                opacity: 1,
                display: 'block',
                transform: 'matrix(1, 0, 0, 1, 0, -10)',
              }}
            >
              <img
                className="xs:w-3/4 xl:w-3/5"
                src="/main_icon_dog_gray.png"
                alt=""
              />
              <div className="inner">
                <div className="flex text-xl right-1">
                  <div></div>
                  {!auth.isLoggedIn && (
                    <div className="ml-10 mt-10">
                      {/* 로그인  */}

                      <a className="a" href="/accounts/login/">
                        로그인
                      </a>

                      {/* 회원가입 */}

                      <a className="a ml-5" href="/accounts/checksignup/">
                        {' '}
                        회원가입{' '}
                      </a>
                    </div>
                  )}
                </div>

                {auth.isLoggedIn && (
                  <>
                    <div className="relative">
                      <span className="rounded-xl bg-white shadow-md border text-center font-bold absolute xs:inset-x-0 sm:inset-x-auto sm:left-10 sm:top-10 sm:text-xl">
                        &nbsp; &nbsp;오늘도 찾아주셨네요, {auth.nickname} 님 ❕
                        &nbsp; &nbsp;
                      </span>
                    </div>
                    <div className="flex text-xl text-left">
                      <div></div>
                      <div className="ml-10 mt-20">
                        {auth.is_staff ? (
                          // 관리자 페이지

                          <a className="a mr-5" href="/admin/main/">
                            관리자 페이지
                          </a>
                        ) : (
                          // 마이페이지

                          <a className="a" href="/mypage/userinfo/">
                            마이페이지
                          </a>
                        )}

                        <a className="a ml-5" href="/" onClick={handleLogout}>
                          로그아웃
                        </a>
                      </div>
                    </div>
                  </>
                )}

                <nav className="menu">
                  <ul>
                    <li>
                      <a href="/">메인</a>
                    </li>
                    <li>
                      {' '}
                      <a href="/introduce/">소개 </a>
                    </li>

                    <li>
                      {' '}
                      <a href="/notice/"> 공지사항 </a>
                    </li>

                    {auth.is_staff ? (
                      <li>
                        {' '}
                        <a href="/inquiry/">Q&A</a>
                      </li>
                    ) : (
                      <li>
                        {' '}
                        <button
                          style={{ transition: 'color 0.3s ease' }}
                          onClick={checkLogin}
                        >
                          크루원 신청
                        </button>
                      </li>
                    )}
                    <li>
                      {' '}
                      <a href="/review/"> 커뮤니티</a>
                    </li>
                  </ul>
                </nav>

                <footer className="footer">
                  <div className="contactInfo">
                    <p>
                      <img src="" alt="" />
                      metabusemail@gmail.com
                    </p>
                  </div>
                  <div className="link_terms">
                    <a href="">이용약관</a>
                    <a href="">개인정보취급방침</a>
                  </div>
                  <div className="copyright">
                    <p>
                      &copy;메타버스 제공/데이터 출처{' '}
                      <strong>동물보호관리시스템</strong> ㅣ Website made by
                      METABUS
                    </p>
                    <p>&copy;METABUS B Team all right reserved.</p>
                  </div>
                </footer>
                <button
                  type="button"
                  onClick={() => handleClick()}
                  class="btn-close-gnb"
                >
                  <img
                    className="hover:scale-110 duration-200"
                    src="/sidecloseicon3.png"
                    alt="button"
                  ></img>
                </button>
              </div>
            </div>
          </>
        ) : (
          // 버튼 닫힌 상태 (기본)
          <>
            <div
              className="menuAnimationLayer"
              style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
            ></div>

            <div
              className="menuLayer"
              style={{
                visibility: 'hidden',
                opacity: 0,
                display: 'none',
                transform: 'matrix(1, 0, 0, 1, 0, -10)',
              }}
            ></div>
          </>
        )}
      </div>
    </>
  );
}
export default NewNav;
