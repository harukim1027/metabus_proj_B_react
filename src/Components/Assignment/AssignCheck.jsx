import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Axios from 'axios';
import Button from 'Button';
import '../../App.css';
import './Assignment.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './SlideStyle.css';

function AssignCheck(props) {
  const { animalId } = useParams();
  let [all_check, set_all_check] = useState(false);
  let [contract_check, set_contract_check] = useState(false);

  // 1번 체크박스
  const [firstCheckBoxActive, setFirstCheckBoxActive] = useState(false);
  const isFirstCheckBoxClicked = () => {
    setFirstCheckBoxActive(!firstCheckBoxActive);
  };

  // 2번 체크박스
  const [secondCheckBoxActive, setSecondCheckBoxActive] = useState(false);
  const isSecondCheckBoxClicked = () => {
    setSecondCheckBoxActive(!secondCheckBoxActive);
  };

  // checkbox의 체크 상태를 확인할 수 있는 checked
  // checked = true (체크 O) / checked = false (체크 x)

  const navigate = useNavigate();

  useEffect(() => {
    set_contract_check(all_check);
  }, [all_check]);

  useEffect(() => {
    if (firstCheckBoxActive && secondCheckBoxActive) {
      set_all_check(true);
    } else set_all_check(false);
  }, [firstCheckBoxActive, secondCheckBoxActive]);

  useEffect(() => {
    setFirstCheckBoxActive(all_check);
    setSecondCheckBoxActive(all_check);
  }, [all_check]);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, []);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [topLocation]);

  //-------------

  return (
    <div className="mx-60 justify-center">
      <div className="header" id="topLoc">
        <div className="content-center overflow-hidden pt-5 pb-10 my-10 w-full">
          <div className="assignments_header rounded-xl  w-full">
            <main className="" role="main">
              <h1 className="mt-5 font-semibold text-2xl text-center">
                🐼 크루 신청하기
              </h1>

              <div className="text-center">
                <div className="font-bold pb-3">
                  <br />
                  <blockquote className=" xs:text-lg md:text-2xl lg:text-3xl font-semibold italic text-center text-slate-900">
                    <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 relative inline-block">
                      <span className="relative text-white font-bold">
                        " 입양 절차, 입양 전 주의사항 "
                      </span>
                    </span>
                    <p className="mt-3 mb-3">
                      안내를 반드시 읽고, 동의해주세요 !
                    </p>
                  </blockquote>
                </div>
              </div>
              <hr />
              <br />

              <div className="w-full  ">
                <span className="mb-10 xs:w-full  after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-black xs:text-xl xs:ml-10 md:text-2xl font-extrabold ">
                  입양 절차
                </span>
                <div className="xs:w-full  content-center xs:text-base md:text-lg lg:text-xl text-right font-semibold text-gray-500">
                  <AwesomeSlider
                    className="check_Container"
                    mobileTouch={true}
                    organicArrows={false}
                    bullets={true}
                  >
                    <span className="mx-20 font-semibold italic flex justify-center">
                      <img
                        src="/assigncheck1.png"
                        alt="assigncheck1"
                        className="xs:w-3/4"
                      />
                    </span>

                    <span className="mx-20 font-semibold italic flex justify-center ">
                      <img
                        src="/assigncheck2.png"
                        alt="assigncheck2"
                        className="xs:w-3/4"
                      />
                    </span>

                    <span className="mx-20 font-semibold italic flex justify-center ">
                      <img
                        src="/assigncheck3.png"
                        alt="assigncheck"
                        className="xs:w-3/4"
                      />
                    </span>
                  </AwesomeSlider>
                  <div className="mt-10 xs:text-base md:text-lg lg:text-xl text-center font-semibold text-gray-500 ">
                    <br />
                    <label className="bg-blue-100 mb-5 mt-10">
                      &nbsp;입양 절차를 숙지했습니다&nbsp;
                      <input
                        type="checkbox"
                        checked={contract_check ? 'checked' : null}
                        onClick={isFirstCheckBoxClicked}
                        required
                      />
                    </label>
                  </div>
                  <br />
                </div>

                {firstCheckBoxActive && (
                  <>
                    <hr className="pb-6 mx-10" />

                    <span className="mb-10 after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-black xs:text-xl xs:ml-10 md:text-2xl font-extrabold">
                      입양 전 주의 사항
                    </span>
                    <div className="flex justify-center w-full">
                      <div className="w-full ">
                        <div className="xs:w-full">
                          <AwesomeSlider
                            className="check_Container2"
                            mobileTouch={true}
                            organicArrows={false}
                            bullets={true}
                          >
                            <span className="flex flex-wrap justify-center font-semibold italic xs:w-full">
                              <img
                                className="assign_photo2 "
                                src="/safe_info1.png"
                                alt="save_info1"
                              />

                              {/* <br />글 갯수:{getSortedArr(userArr)[0]?.[1]} */}
                            </span>

                            <span className="flex flex-wrap justify-center font-semibold italic xs:w-full">
                              <img
                                className="assign_photo2"
                                src="/safe_info2.png"
                                alt="save_info2"
                              />
                            </span>

                            <span className="flex flex-wrap justify-center font-semibold italic xs:w-full ">
                              <img
                                className="assign_photo2 "
                                src="/safe_info3.png"
                                alt="save_info3"
                              />
                            </span>

                            <span className="flex flex-wrap justify-center font-semibold italic xs:w-full">
                              <img
                                className="assign_photo2"
                                src="/safe_info4.png"
                                alt="save_info4"
                              />
                            </span>

                            <span
                              id="last"
                              className="flex flex-wrap justify-center font-semibold italic xs:w-full"
                            >
                              <img
                                className="assign_photo2"
                                src="/safe_info5.png"
                                alt="save_info5"
                              />
                            </span>
                          </AwesomeSlider>
                        </div>
                        <br className="mx-20" />
                        <br />
                        <br />
                        <div className="xs:text-base md:text-lg lg:text-xl text-center pb-5 font-bold text-gray-500 mr-5">
                          <label className="bg-blue-100">
                            &nbsp;안전 수칙을 숙지했습니다&nbsp;
                            <input
                              type="checkbox"
                              checked={contract_check ? 'checked' : null}
                              onClick={() =>
                                setSecondCheckBoxActive(!secondCheckBoxActive)
                              }
                              required
                            />
                          </label>
                        </div>
                        <div className="pb-3 text-center">
                          <label className=" xs:text-base md:text-lg lg:text-xl bg-yellow-100 font-bold mr-5">
                            &nbsp;모두 동의합니다&nbsp;
                            <input
                              checked={all_check ? 'checked' : null}
                              type="checkbox"
                              onClick={() => {
                                set_all_check(!all_check);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-end xs:w-5/6 lg:w-11/12"></div>

                <hr />
                <div className="xs:text-sm sm:text-xl text-red-400 text-center">
                  <br />
                  모두 동의를 해야 입양 신청을 할 수 있어요 ! 🐰
                </div>
                <div className="text-center my-3 text-2xl">
                  {all_check && (
                    <button
                      onClick={() => navigate(`/assignment/new/${animalId}/`)}
                      className="hover:bg-blue-500 py-2 rounded-lg shadow-lg bg-blue-700 font-extrabold xs:text-xl md:text-3xl text-white"
                    >
                      &nbsp;&nbsp;신청&nbsp;&nbsp;
                    </button>
                  )}
                </div>
                <br />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignCheck;
