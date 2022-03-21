import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';

import './FindOwnerBoard.css';
import '../../App.css';
import LoadingIndicator from 'LoadingIndicator';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function FindOwnerBoardForm({ findBoardId, handleDidSave }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState('');

  const [{ data: findBoard, loading, error }] = useApiAxios(
    {
      url: `/find_owner_board/api/board/`,
      method: 'GET',
      data: { user: auth.userID },
    },
    {
      manual: false,
    },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !findBoardId
        ? '/find_owner_board/api/board/'
        : `/find_owner_board/api/board/${findBoardId}/`,
      method: !findBoardId ? 'POST' : 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    findBoard || INIT_FIELD_VALUES,
  );

  // fieldValues.animal = selAnimalInfo;
  // fieldValues.adoptassignment = filtAnimal;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  // 사진 등록시
  const imgpreview1 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [findBoard]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  //-------------

  return (
    <>
      {/* review_header : 배경 흰색 */}
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 review_header rounded-xl shadow-md overflow-hidden md:px-20 pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-10 mb-6 text-2xl font-semibold italic text-center text-slate-900">
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-500 relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl  font-extrabold">
              <span class="relative text-white">
                {!findBoardId
                  ? ' " 이 아이 가족 찾아요😭 작성 " '
                  : ' " 이 아이 가족 찾아요😭 수정 " '}
              </span>
            </span>
          </blockquote>

          {/* 로딩 에러 */}
          {loading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {error && (
            <>
              <p className="text-red-400 text-center">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          <br />

          {/*  */}
        </div>
      </div>

      {/* ----------------------------- */}
      {/* 리뷰 글 폼 */}

      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 notice_header rounded-md shadow-md overflow-hidden pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <form
            onSubmit={handleSubmit}
            className="review_header rounded-md sm:px-0 md:px-20 pt-6 pb-8"
          >
            {/* 제목 입력 input 박스 */}
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="notice_header rounded-xl px-10 pt-6 pb-8"
              >
                <div className="mb-3 w-full">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
                    제목
                  </span>
                  <input
                    type="text"
                    name="title"
                    value={fieldValues.title}
                    onChange={handleFieldChange}
                    placeholder="제목을 입력해주세요."
                    className="rounded-md text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 "
                  />
                  {saveErrorMessages.title?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      제목을 한글로 입력해주세요.
                    </p>
                  ))}
                </div>
                <br />

                {/* 내용 입력 input 박스 */}
                <div className="mb-3 w-full ">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
                    내용
                  </span>
                </div>

                <textarea
                  type="text"
                  name="content"
                  value={fieldValues.content}
                  onChange={handleFieldChange}
                  placeholder="내용을 입력해주세요."
                  className="rounded-md text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 h-60"
                />
                {saveErrorMessages.content?.map((message, index) => (
                  <p key={index} className="text-base text-red-400">
                    내용을 입력해주세요.
                  </p>
                ))}

                {/* 이미지 첨부 인풋박스 */}
                <div className="my-5 w-full">
                  <span className=" block tracking-wide text-blue-900 text-base font-bold mb-2 ">
                    이미지 첨부
                  </span>
                  <h2 className="text-gray-500 text-xxs text-">
                    ( 최대 5개까지 이미지를 등록할 수 있습니다. )
                  </h2>

                  <div className="bg-white py-5">
                    {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                    <ul>
                      {/* 개별 이미지 input 박스 1*/}
                      <li className="mx-5 flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image1"
                          className="xs:text-sm md:text-base"
                          onChange={(e) => {
                            imgpreview1(e, e.target.files[0]);
                          }}
                        />
                        {!image && (
                          <div>
                            <img
                              src={findBoard?.image1}
                              alt=""
                              className="h-44"
                            />
                          </div>
                        )}

                        <div>
                          <img src={image} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                image1: '',
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.image1?.map((message, index) => (
                        <p key={index} className="text-xxs text-red-400">
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="shadow-md bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-lg border-4 font-bold text-white py-1 px-2 rounded"
                    onClick={(e) => handleSubmit(e)}
                    onSubmit={handleSubmit}
                  >
                    저장
                  </button>

                  <button
                    onClick={() => {
                      navigate(`/review/${findBoardId ? findBoardId : ''}`);
                    }}
                    className="shadow-md ml-3 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 font-bold text-lg border-4 text-white py-1 px-2 rounded"
                  >
                    취소
                  </button>

                  <div className="p-5">
                    {saveLoading && (
                      <LoadingIndicator>저장 중...</LoadingIndicator>
                    )}
                    {saveError && (
                      <>
                        <p className="text-red-400">
                          `저장 중 에러가 발생했습니다. 메세지를 확인해주세요.`
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>

      <DebugStates
        findBoard={findBoard}
        // getLoading={getLoading}
        // getError={getError}
        fieldValues={fieldValues}
      />
    </>
  );
}

export default FindOwnerBoardForm;
