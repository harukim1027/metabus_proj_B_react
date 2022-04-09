import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import produce from 'immer';
import { useEffect, useState } from 'react';
import LoadingIndicator from 'LoadingIndicator';
// import DebugStates from 'DebugStates';

import './Notice.css';
import '../../App.css';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function NoticeForm({ noticeId, handleDidSave }) {
  const { auth } = useAuth();
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();

  // 사진 등록시 미리보기
  const imgpreview = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImage(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  // 조회
  const [{ data: noticeData, loading: getLoading, error: getError }, refetch] =
    useApiAxios(
      {
        url: `/notice/api/notices/${noticeId}/`,
        method: 'GET',
      },
      { manual: !noticeId },
    );

  // 게시글 저장
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !noticeId
        ? `/notice/api/notices/`
        : `/notice/api/notices/${noticeId}/`,
      method: !noticeId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  // 이미지 저장
  const [{ loading: addImageLoading, error: addImageError }, addImageRequest] =
    useApiAxios(
      {
        url: `/notice/api/images/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },

      { manual: true },
    );

  // 이미지 삭제
  const [imageNo, setImageNo] = useState();
  const [{ loading: rmImageLoading, error: rmImageError }, deleteImage] =
    useApiAxios(
      {
        url: `/notice/api/images/${imageNo}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  // 첨부파일 저장
  const [{ loading: addFileLoading, error: addFileError }, addFileRequest] =
    useApiAxios(
      {
        url: `/notice/api/files/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  // 첨부파일 삭제
  const [fileNo, setFileNo] = useState();
  const [{ loading: rmFileLoading, error: rmFileError }, deleteFile] =
    useApiAxios(
      {
        url: `/notice/api/files/${fileNo}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    noticeData || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        // draft.image1 = '';
        // draft.image2 = '';
        // draft.image3 = '';
        // draft.image4 = '';
        // draft.image5 = '';
        // draft.file1 = '';
        // draft.file2 = '';
        // draft.file3 = '';
        draft.user = auth.userID;
      }),
    );
  }, [noticeData]);

  // 저장 버튼 기능
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        if (
          noticeData
            ? fileList.length + noticeData?.notice_image?.length >= 0 &&
              fileList.length + noticeData?.notice_image?.length <= 5
            : fileList.length >= 0 && fileList.length <= 5
        ) {
          fileList.forEach((file) => formData.append(name, file));
        } else {
          window.alert('사진은 최대 5개까지 첨부 가능합니다.');
        }
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

  // 이미지 추가 (수정시)
  const handleAddImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        if (name === 'image') {
          if (fileList.length + noticeData.notice_image.length <= 5) {
            fileList.forEach((file) => {
              formData.append(name, file);
              formData.append('notice_no', noticeData.notice_no);
            });
          } else {
            window.alert('사진은 최대 5개까지 첨부 가능합니다.');
          }
        }
      }
    });
    addImageRequest({
      data: formData,
    }).then(() => {
      refetch();
    });
  };

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 notice_header rounded-md shadow-md overflow-hidden pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          {/* 폼 작성 시작부분 */}
          <blockquote className="mt-3 mb-10 font-semibold italic text-center text-slate-900">
            <span className="mt-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-500 relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl font-extrabold">
              <span className="relative text-white">
                {!noticeId ? ' " 공지사항 작성 " ' : ' " 공지사항 수정 " '}
              </span>
            </span>
          </blockquote>

          {getLoading && '로딩 중 ...'}
          {getError && '로딩 중 에러가 발생했습니다.'}

          <hr />
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="mx-5 notice_header rounded-md sm:px-0 md:px-20 pt-6 pb-8"
            >
              {/* 제목 입력 인풋박스 */}
              <div className=" mb-3 w-full">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                  제목
                </span>
                <input
                  type="text"
                  name="title"
                  value={fieldValues.title}
                  onChange={handleFieldChange}
                  placeholder="제목을 입력해주세요."
                  className="rounded-md text-lg  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 "
                />
                {saveErrorMessages.title?.map((message, index) => (
                  <p key={index} className="text-base text-red-400">
                    제목을 입력해주세요.
                  </p>
                ))}
              </div>
              {/* 내용 입력 인풋박스 */}
              <div className="mb-3 w-full ">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                  내용
                </span>
                <textarea
                  name="content"
                  value={fieldValues.content}
                  onChange={handleFieldChange}
                  rows="7" // textarea의 행 설정으로 늘릴 수 있음
                  placeholder="내용을 입력해주세요."
                  className="rounded-md text-lg  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 h-60"
                />
                {saveErrorMessages.content?.map((message, index) => (
                  <p key={index} className="text-base text-red-400">
                    내용을 입력해주세요.
                  </p>
                ))}
              </div>
              <hr />

              {/* 첨부 이미지 삭제 */}
              {noticeData && (
                <>
                  <h2>첨부 이미지들</h2>
                  {noticeData.notice_image.map((image) => (
                    <>
                      <img src={image.image} alt="" className="inline w-44" />
                      <div>
                        <button
                          onMouseOver={() => setImageNo(image.notice_image_no)}
                          onClick={(e) => {
                            e.preventDefault();
                            if (noticeData.notice_image.length >= 0) {
                              deleteImage().then(() => refetch());
                            }
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    </>
                  ))}
                </>
              )}

              {/* 이미지 첨부 인풋박스 */}
              {!noticeData ? (
                <div className="my-5 w-full">
                  <span className="block tracking-wide text-blue-900 text-xl font-bold mb-2 ">
                    이미지 첨부
                  </span>
                  <h2 className="text-gray-500 text-xxs">
                    ( 최대 5개까지 이미지를 등록할 수 있습니다. )
                  </h2>

                  <div className="flex justify-center bg-white py-5 w-full">
                    {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                    <ul>
                      {/* 개별 이미지 input 박스 1*/}
                      <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mx-5 sm:mx-0">
                        <input
                          type="file"
                          multiple={true}
                          max={5}
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image"
                          className="text-gray-800 "
                          onChange={(e) => {
                            imgpreview(e, e.target.files[0]);
                          }}
                        />
                        {!previewImage && (
                          <div>
                            <img
                              src={noticeData?.image}
                              alt=""
                              className="h-44"
                            />
                          </div>
                        )}

                        <div>
                          <img src={previewImage} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setPreviewImage('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                notice_image: [],
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="my-5 w-full">
                  <span className="block tracking-wide text-blue-900 text-xl font-bold mb-2 ">
                    이미지 추가
                  </span>
                  <h2 className="text-gray-500 text-xxs">
                    ( 최대 5개까지 이미지를 등록할 수 있습니다. )
                  </h2>

                  <div className="flex justify-center bg-white py-5 w-full">
                    {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                    <ul>
                      {/* 개별 이미지 input 박스 1*/}
                      <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mx-5 sm:mx-0">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image"
                          className="text-gray-800 "
                          onChange={(e) => {
                            imgpreview(e, e.target.files[0]);
                          }}
                        />
                        {!previewImage && (
                          <div>
                            <img
                              src={noticeData?.image}
                              alt=""
                              className="h-44"
                            />
                          </div>
                        )}

                        <div>
                          <img src={previewImage} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setPreviewImage('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                notice_image: [],
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.notice_image?.map((message, index) => (
                        <p key={index} className="text-xxs text-red-400">
                          {/* {message} */}
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}
                    </ul>
                    <button onClick={(e) => handleAddImage(e)}>
                      이미지 추가하기
                    </button>
                  </div>
                </div>
              )}

              <hr />
              {/* 파일 첨부 인풋박스 시작 부분 */}
              <div className="my-3 w-full">
                <span className="block tracking-wide text-blue-900 text-xl font-bold mb-2 ">
                  파일 첨부
                </span>
                <h2 className="text-gray-500 text-xxs">
                  ( 최대 3개까지 첨부파일을 등록할 수 있습니다. )
                </h2>

                {/* 개별 파일 input 박스 1*/}
                <div className="flex justify-center bg-white py-5 w-full">
                  {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                  <ul>
                    {/* 개별 파일 input 박스 1*/}
                    <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mx-5 sm:mx-0">
                      <input
                        type="file"
                        accept=".docx, .hwp, .xlsx, .pdf"
                        name="file1"
                        className="text-gray-800 "
                        onChange={handleFieldChange}
                      />
                      <div>
                        {(noticeData?.file1 || fieldValues.file1) &&
                          '파일1이 존재합니다.'}
                      </div>
                      <button
                        className="rounded-full px-2 py-1 bg-sky-300"
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldValues((prevFieldValues) => {
                            return {
                              ...prevFieldValues,
                              file1: '',
                            };
                          });
                        }}
                      >
                        X
                      </button>
                    </li>
                    {/* 개별 파일 input 박스 2*/}
                    {/* <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mx-5 sm:mx-0">
                      <input
                        type="file"
                        accept=".docx, .hwp, .xlsx, .pdf"
                        name="file2"
                        className="text-gray-800 "
                        onChange={handleFieldChange}
                      />
                      <div>
                        {(noticeData?.file2 || fieldValues.file2) &&
                          '파일2가 존재합니다.'}
                      </div>
                      <button
                        className="rounded-full px-2 py-1 bg-sky-300"
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldValues((prevFieldValues) => {
                            return {
                              ...prevFieldValues,
                              file2: '',
                            };
                          });
                        }}
                      >
                        X
                      </button>
                    </li> */}
                    {/* 개별 파일 input 박스 3*/}
                    {/* <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mx-5 sm:mx-0">
                      <input
                        type="file"
                        accept=".docx, .hwp, .xlsx, .pdf"
                        name="file3"
                        className="text-gray-800 "
                        onChange={handleFieldChange}
                      />
                      <div>
                        {(noticeData?.file3 || fieldValues.file3) &&
                          '파일3이 존재합니다.'}
                      </div>
                      <button
                        className="rounded-full px-2 py-1 bg-sky-300"
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldValues((prevFieldValues) => {
                            return {
                              ...prevFieldValues,
                              file3: '',
                            };
                          });
                        }}
                      >
                        X
                      </button>
                    </li> */}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button className="shadow-md font-bold bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-1 px-2 rounded">
                  저장
                </button>

                <button
                  onClick={() => {
                    navigate(`/notice/${noticeId ? noticeId : ''}`);
                  }}
                  className="shadow-md font-bold ml-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-1 px-2 rounded"
                >
                  취소
                </button>

                <div>
                  {saveLoading && (
                    <LoadingIndicator>저장 중...</LoadingIndicator>
                  )}
                  {saveError &&
                    `저장 중 에러가 발생했습니다. 내용을 확인해주세요.`}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <DebugStates fieldValues={fieldValues} /> */}
    </>
  );
}

export default NoticeForm;
