import { useAuth } from 'contexts/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunitySidebar.css';

const CommunitySidebar = () => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(200);
  const side = useRef();
  const navigate = useNavigate();
  const { auth } = useAuth();
  // console.log(isOpen);

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

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(200);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  });

  return (
    <>
      <div
        ref={side}
        className=" sidebar absolute"
        style={{
          width: '200px',
          height: '380px',
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <div className="flex justify-center">
          <ul>
            <li className="bg-gray-100 py-2 text-2xl text-center ">
              {auth.userID}
            </li>
            <hr />
            <li className="mx-5 my-3 ">
              <div
                onClick={() => navigate(`/review/`)}
                className="cursor-pointer hover:bg-purple-500"
              >
                <span className="text-black hover:text-white xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm font-bold">
                  입양 다이어리
                </span>
              </div>
            </li>
            <hr />
            <li className="mx-5 my-3">
              <div
                onClick={() => navigate(`/lostpetboard/`)}
                className="cursor-pointer hover:bg-red-500"
              >
                <span className="text-black hover:text-white xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm font-bold">
                  잃어버렸어요!
                </span>
              </div>
            </li>
            <hr />
            <li className="mx-5 my-3">
              <div
                onClick={() => navigate(`/findboard/`)}
                className="cursor-pointer hover:bg-blue-900"
              >
                <span className="text-black hover:text-white xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm font-bold">
                  주인 찾습니다!
                </span>
              </div>
            </li>
            <hr />
          </ul>
        </div>
      </div>
      <button onClick={() => toggleMenu()} className="button">
        {isOpen ? (
          <>
            <img
              src="/mypage_menu_cat_close.png"
              alt="button"
              className=" duration-200 "
            ></img>
          </>
        ) : (
          <>
            <img
              src="/menu_cat.png"
              alt="button"
              className="duration-200"
            ></img>
          </>
        )}
      </button>
    </>
  );
};

export default CommunitySidebar;
