import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './SlideStyle.css';
import '../../App.css';

// 소개 페이지 - 사진만 출력
function InfoAnimal() {
  // 스크롤 기능
  const [finalImg, setFinalImg] = useState(false);
  // console.log(finalImg);

  const handleClick = () => {
    setFinalImg(!finalImg);
  };

  return (
    <>
      <div className="md:px-10 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
        <AwesomeSlider
          className="Container"
          mobileTouch={true}
          organicArrows={true}
        >
          <h1 className="flex flex-wrap justify-center font-semibold italic md:w-5/6 xs:w-3/4">
            <img src="/safe_info1.png" alt="save_info1" />

            {/* <br />글 갯수:{getSortedArr(userArr)[0]?.[1]} */}
          </h1>
          <h1 className="flex flex-wrap justify-center font-semibold italic md:w-5/6 xs:w-3/4">
            <img src="/safe_info2.png" alt="save_info2" />
          </h1>

          <h1 className="flex flex-wrap justify-center font-semibold italic md:w-5/6 xs:w-3/4">
            <img src="/safe_info3.png" alt="save_info3" />
          </h1>

          <h1 className="flex flex-wrap justify-center font-semibold italic md:w-5/6 xs:w-3/4">
            <img src="/safe_info4.png" alt="save_info4" />
          </h1>

          <h1 className="flex flex-wrap justify-center font-semibold italic md:w-5/6 xs:w-3/4">
            <img src="/safe_info5.png" alt="save_info5" />
          </h1>
          <button onClick={handleClick}> 주의 사항을 다 읽었어요 ! </button>
        </AwesomeSlider>
      </div>
    </>
  );
}
export default InfoAnimal;
