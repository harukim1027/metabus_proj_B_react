import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';
import DebugStates from 'DebugStates';
import produce from 'immer';
import LoadingIndicator from 'LoadingIndicator';
import './FindOwnerBoard.css';
import '../../App.css';
import Modal from 'react-modal/lib/components/Modal';
import PageMyLocationMap from 'Pages/PageMap/PageMyLocationMap';

const INIT_FIELD_VALUES = {
  title: '',
  status: '찾는중',
  animal_type: '동물 종류',
  dog_breed: '전체',
  cat_breed: '전체',
  sex: '미상',
  animal_tag: '',
  find_time: '',
  find_location: '',
  content: '',
  board_image: [],
};

function FindOwnerBoardForm({ findBoardId, handleDidSave }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [inputAddr, setInputAddr] = useState();

  // 조회 (작성 글 수정시 기존 데이터가 남아있도록 하기위함)
  const [{ data: findBoard, loading: getLoading, error: getError }, refetch] =
    useApiAxios(
      {
        url: `/find_owner_board/api/board/${findBoardId}/`,
        method: 'GET',
      },
      {
        manual: !findBoardId,
      },
    );

  // 게시글 저장 API 요청
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

  const [{ loading: addImageLoading, error: addImageError }, addImageRequest] =
    useApiAxios(
      {
        url: `/find_owner_board/api/images/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  // 이미지 삭제 API요청
  const [imageNo, setImageNo] = useState();
  const [{ loading: deleteLoading, error: deleteError }, deleteImage] =
    useApiAxios(
      {
        url: `/find_owner_board/api/images/${imageNo}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  // 시간 기본값 추가
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  INIT_FIELD_VALUES.find_time = today.toISOString().slice(0, 16);

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    findBoard || INIT_FIELD_VALUES,
  );

  const fieldtime = new Date(fieldValues.find_time);
  // 마커 위치의 주소 input에 넣기
  useEffect(() => {
    setFieldValues((prev) => {
      return { ...prev, find_location: inputAddr };
    });
  }, [inputAddr]);

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.user = findBoard ? findBoard.user.userID : auth.userID;
        draft.find_location = findBoard?.find_location;
      }),
    );
  }, [findBoard, auth]);

  // 개/고양이 한쪽 품종 선택 후 다른걸로 바꿀 경우 전자 초기화
  useEffect(() => {
    if (fieldValues.animal_type === '개') {
      setFieldValues((prev) => {
        return { ...prev, cat_breed: '전체' };
      });
    } else {
      setFieldValues((prev) => {
        return { ...prev, dog_breed: '전체' };
      });
    }
  }, [fieldValues.animal_type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        if (
          findBoard
            ? findBoard?.board_image?.length > 0 &&
              findBoard?.board_image?.length <= 5
            : fileList.length > 0 && fileList.length <= 5
        ) {
          fileList.forEach((file) => formData.append(name, file));
        } else {
          window.alert(
            '사진은 최소 1개 이상 첨부해야하고, 최대 5개까지 첨부 가능합니다.',
          );
          e.stop();
        }
      } else {
        formData.append(name, value);
      }
    });
    if (
      fieldValues.title !== '' &&
      fieldValues.content !== '' &&
      fieldValues.animal_type !== '동물 종류' &&
      fieldValues.find_location !== '' &&
      fieldValues.animal_tag !== '' &&
      fieldtime.valueOf() < today.valueOf()
    ) {
      saveRequest({
        data: formData,
      }).then((response) => {
        const savedPost = response.data;
        if (handleDidSave) handleDidSave(savedPost);
      });
    } else {
      window.alert('별표(*)가 있는 필수 내용을 전부 입력해주세요');
      e.stop();
    }
  };

  // 이미지 추가 (수정시)
  const handleAddImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        if (name === 'image') {
          if (fileList.length + findBoard.board_image.length <= 5) {
            fileList.forEach((file) => {
              formData.append(name, file);
              formData.append('find_board_no', findBoard.find_board_no);
            });
          } else {
            window.alert(
              '사진은 최소 1개 이상 첨부해야하고, 최대 5개까지 첨부 가능합니다.',
            );
            e.stop();
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

  //-------------

  return (
    <>
      {/* review_header : 배경 흰색 */}
      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 review_header rounded-xl shadow-md overflow-hidden md:px-20 pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-10 mb-6 text-2xl font-semibold italic text-center text-slate-900">
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-black relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl  font-extrabold">
              <span className="relative text-white">
                {!findBoardId
                  ? ' " 이 아이 가족 찾아요😭 작성 " '
                  : ' " 이 아이 가족 찾아요😭 수정 " '}
              </span>
            </span>
          </blockquote>

          {/* 로딩 에러 */}
          {getLoading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {getError && (
            <>
              <p className="text-red-400 text-center">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          <br />
        </div>
      </div>

      {/* FindOwnerBoard 글 폼 */}
      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 notice_header rounded-md shadow-md overflow-hidden pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
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

              {/* 동물 종류 선택 */}
              <div className="mb-3 w-full">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block tracking-wide text-gray-700 text-base font-bold mb-2">
                  동물 종류 선택
                </span>
                <div className="relative">
                  <select
                    name="animal_type"
                    value={fieldValues.animal_type}
                    onChange={handleFieldChange}
                    className="rounded-md text-lg bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 appearance-none"
                    defaultValue="동물 종류"
                  >
                    <option value="동물 종류">동물 종류</option>
                    <option value="개">개</option>
                    <option value="고양이">고양이</option>
                  </select>

                  <div className="pointer-events-none absolute top-4 right-3 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  {saveErrorMessages.animal_type?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      동물 종류를 선택해주세요.
                    </p>
                  ))}
                </div>
              </div>

              {/* 강아지 품종 */}
              {fieldValues.animal_type === '개' && (
                <div className="mb-3 w-full">
                  <span className="tracking-wide text-gray-700 text-base font-bold mb-2">
                    개 품종 선택
                  </span>
                  <div className="relative">
                    <select
                      name="dog_breed"
                      value={fieldValues.dog_breed}
                      onChange={handleFieldChange}
                      className="rounded-md text-lg bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 appearance-none"
                      defaultValue="전체"
                    >
                      <option value="전체">전체</option>
                      <option value="기타">기타</option>
                      <option value="믹스견">믹스견</option>
                      <option value="모르겠어요">모르겠어요</option>
                      <option value="골든리트리버">골든리트리버</option>
                      <option value="래브라도 리트리버">
                        래브라도 리트리버
                      </option>
                      <option value="그레이 하운드">그레이 하운드</option>
                      <option value="그레이트 피레니즈">
                        그레이트 피레니즈
                      </option>
                      <option value="아프간 하운드">아프간 하운드</option>
                      <option value="닥스훈트">닥스훈트</option>
                      <option value="달마시안">달마시안</option>
                      <option value="도베르만">도베르만</option>
                      <option value="로트와일러">로트와일러</option>
                      <option value="셰퍼드">셰퍼드</option>
                      <option value="말라뮤트">말라뮤트</option>
                      <option value="말티즈">말티즈</option>
                      <option value="푸들">푸들</option>
                      <option value="스피츠">스피츠</option>
                      <option value="볼 테리어">볼 테리어</option>
                      <option value="보스턴 테리어">보스턴 테리어</option>
                      <option value="슈나우져">슈나우져</option>
                      <option value="보더콜리">보더콜리</option>
                      <option value="불독">불독</option>
                      <option value="비글">비글</option>
                      <option value="비숑 프리제">비숑 프리제</option>
                      <option value="빠삐용">빠삐용</option>
                      <option value="사모예드">사모예드</option>
                      <option value="삽살개">삽살개</option>
                      <option value="샤페이">샤페이</option>
                      <option value="시베리안 허스키">시베리안 허스키</option>
                      <option value="시츄">시츄</option>
                      <option value="시바">시바</option>
                      <option value="코카 스파니엘">코카 스파니엘</option>
                      <option value="오브차카">오브차카</option>
                      <option value="요크셔테리어">요크셔테리어</option>
                      <option value="전체">전체</option>
                      <option value="치와와">치와와</option>
                      <option value="차우차우">차우차우</option>
                      <option value="웰시코기">웰시코기</option>
                      <option value="페키니즈">페키니즈</option>
                      <option value="진도개">진도개</option>
                      <option value="포메라니안">포메라니안</option>
                      <option value="퍼그">퍼그</option>
                    </select>

                    <div className="pointer-events-none absolute top-4 right-3 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                    {saveErrorMessages.dog_breed?.map((message, index) => (
                      <p key={index} className="text-base text-red-400">
                        강아지 품종을 선택해주세요.
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* 고양이 품종 */}
              {fieldValues.animal_type === '고양이' && (
                <div className="mb-3 w-full">
                  <span className="tracking-wide text-gray-700 text-base font-bold mb-2">
                    고양이 품종 선택
                  </span>
                  <div className="relative">
                    <select
                      name="cat_breed"
                      value={fieldValues.cat_breed}
                      onChange={handleFieldChange}
                      className="rounded-md text-lg bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 appearance-none"
                      defaultValue="전체"
                    >
                      <option value="전체">전체</option>
                      <option value="기타">기타</option>
                      <option value="믹스묘">믹스묘</option>
                      <option value="모르겠어요">모르겠어요</option>
                      <option value="샴">샴</option>
                      <option value="러시안 블루">러시안 블루</option>
                      <option value="먼치킨">먼치킨</option>
                      <option value="발레니즈">발레니즈</option>
                      <option value="터키쉬 앙고라">터키쉬 앙고라</option>
                      <option value="노르웨이 숲">노르웨이 숲</option>
                      <option value="메인쿤">메인쿤</option>
                      <option value="버만">버만</option>
                      <option value="벵갈">벵갈</option>
                      <option value="스핑크스">스핑크스</option>
                      <option value="스코티쉬 폴드">스코티쉬 폴드</option>
                      <option value="시베리안">시베리안</option>
                      <option value="페르시안">페르시안</option>
                      <option value="코리안 숏헤어">코리안 숏헤어</option>
                      <option value="아메리칸 숏헤어">아메리칸 숏헤어</option>
                      <option value="히말라얀">히말라얀</option>
                      <option value="한국 고양이">한국 고양이</option>
                    </select>

                    <div className="pointer-events-none absolute top-4 right-3 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                    {saveErrorMessages.cat_breed?.map((message, index) => (
                      <p key={index} className="text-base text-red-400">
                        고양이 품종을 선택해주세요.
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* 성별 선택 */}
              <div className="mb-3 w-full">
                <span className=" tracking-wide text-gray-700 text-base font-bold mb-2">
                  성별 선택
                </span>
                <div className="relative">
                  <select
                    name="sex"
                    value={fieldValues.sex}
                    onChange={handleFieldChange}
                    className="rounded-md text-lg bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 appearance-none"
                    defaultValue="미상"
                  >
                    <option value="미상">미상</option>
                    <option value="암컷">암컷</option>
                    <option value="수컷">수컷</option>
                  </select>

                  <div className="pointer-events-none absolute top-4 right-3 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  {saveErrorMessages.sex?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      성별을 선택해주세요.
                    </p>
                  ))}
                </div>
              </div>

              {/* 인식표 입력 input박스 */}
              <div className="mb-3 w-full">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block tracking-wide text-gray-700 text-base font-bold mb-2">
                  인식표 입력
                </span>
                <input
                  name="animal_tag"
                  value={fieldValues.animal_tag}
                  onChange={handleFieldChange}
                  placeholder="인식표를 입력해주세요."
                  className="rounded-md text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6"
                />
                {saveErrorMessages.animal_tag?.map((message, index) => (
                  <p key={index} className="text-base text-red-400">
                    인식표를 입력해주세요.
                  </p>
                ))}
              </div>

              {/* 발견장소 지도로 선택하여 input박스에 입력되는 기능 */}
              <div className="mb-3 w-full">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block tracking-wide text-gray-700 text-base font-bold mb-2">
                  발견 장소
                </span>
                <button
                  className="bg-blue-800 hover:bg-blue-300 text-white hover:text-black rounded-lg p-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMap(true);
                  }}
                >
                  지도에서 선택하기
                </button>
                <Modal
                  isOpen={showMap}
                  onRequestClose={() => setShowMap(false)}
                  style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    },
                    content: {
                      position: 'absolute',
                      top: '140px',
                      left: '40px',
                      right: '40px',
                      bottom: '140px',
                      border: '1px solid #ccc',
                      background: '#fff',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '10px',
                      outline: 'none',
                      padding: '20px',
                    },
                  }}
                >
                  <button
                    className="p-2 bg-green-300 rounded-lg right-0"
                    onClick={() => setShowMap(false)}
                  >
                    지도 닫기
                  </button>
                  <PageMyLocationMap
                    setInputAddr={setInputAddr}
                    setShowMap={setShowMap}
                  />
                </Modal>
                <input
                  name="find_location"
                  value={
                    inputAddr === undefined
                      ? fieldValues.find_location
                      : inputAddr
                  }
                  readOnly={true}
                  onChange={(e) => handleFieldChange(e)}
                  placeholder="발견 장소를 입력해주세요."
                  className="rounded-md text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6"
                />
                {saveErrorMessages.find_location?.map((message, index) => (
                  <p key={index} className="text-base text-red-400">
                    발견장소를 입력해주세요.
                  </p>
                ))}
              </div>

              {/* 발견 시각 */}
              <div className="mb-3 w-full">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block tracking-wide text-gray-700 text-base font-bold mb-2">
                  발견 시각
                </span>
                <input
                  type="datetime-local"
                  name="find_time"
                  value={fieldValues.find_time}
                  onChange={handleFieldChange}
                  placeholder="발견 시각을 입력해주세요."
                  className="rounded-md text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3"
                />
                <h2
                  className={
                    findBoard
                      ? 'text-sm text-red-500'
                      : 'text-sm text-red-500 mb-6'
                  }
                >
                  미래의 시간은 입력하실 수 없습니다.
                </h2>
                {findBoard && (
                  <h2 className="mb-6">
                    등록되어 있는 시각 : {findBoard.find_time}
                  </h2>
                )}
                {saveErrorMessages.find_time?.map((message, index) => (
                  <p key={index} className="text-base text-red-400">
                    발견 시각을 입력해주세요.
                  </p>
                ))}
              </div>

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

              {/* 첨부 이미지 삭제 */}
              {findBoard && (
                <>
                  <h2>첨부 이미지들</h2>
                  {findBoard.board_image.map((image) => (
                    <>
                      <img src={image.image} alt="" className="inline w-44" />
                      <div>
                        <button
                          onMouseOver={() => setImageNo(image.find_image_no)}
                          onClick={(e) => {
                            e.preventDefault();
                            if (findBoard.board_image.length > 1) {
                              deleteImage().then(() => refetch());
                            } else {
                              window.alert(
                                '이미지는 최소 한장 이상 존재해야합니다.',
                              );
                              e.stop();
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

              {/* 이미지 등록 부분 */}
              {!findBoard ? (
                <div className="my-5 w-full">
                  {/* 등록시 */}
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block tracking-wide text-blue-900 text-base font-bold mb-2 ">
                    이미지 첨부
                  </span>
                  <h2 className="text-gray-500 text-xxs text-">
                    ( 이미지는 필수로 최소{' '}
                    <span className="text-red-500 font-semibold">1개</span> 이상
                    등록해야하고, 최대{' '}
                    <span className="text-red-500 font-semibold">5개</span>까지
                    등록할 수 있습니다. )
                  </h2>

                  <div className="bg-white py-5">
                    {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                    <ul>
                      {/* 개별 이미지 input 박스 1*/}
                      <li className="mx-5 flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
                        <input
                          type="file"
                          multiple={true}
                          max={5}
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="board_image"
                          className="xs:text-sm md:text-base"
                          onChange={(e) => {
                            imgpreview(e, e.target.files[0]);
                          }}
                        />
                        {!previewImage && (
                          <div>
                            <img
                              src={findBoard?.image}
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
                                board_image: [],
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.board_image?.map((message, index) => (
                        <p key={index} className="text-xxs text-red-400">
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="my-5 w-full">
                  {/* 수정시 */}
                  <span className=" block tracking-wide text-blue-900 text-base font-bold mb-2 ">
                    이미지 추가 (추가 시, 파일을 선택한 후 아래 ➕ 버튼을
                    눌러주세요.)
                  </span>
                  <h2 className="text-gray-500 text-xxs text-">
                    ( 이미지는 필수로 최소{' '}
                    <span className="text-red-500 font-semibold">1개</span> 이상
                    등록해야하고, 최대{' '}
                    <span className="text-red-500 font-semibold">5개</span>까지
                    등록할 수 있습니다. )
                  </h2>

                  <div className="bg-white py-5">
                    {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                    <ul>
                      {/* 개별 이미지 input 박스 1*/}
                      <li className="mx-5 flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
                        <input
                          type="file"
                          // multiple={true}
                          // max={5}
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image"
                          className="xs:text-sm md:text-base"
                          onChange={(e) => {
                            imgpreview(e, e.target.files[0]);
                          }}
                        />
                        {!previewImage && (
                          <div>
                            <img
                              src={findBoard?.image}
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
                                board_image: [],
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.board_image?.map((message, index) => (
                        <p key={index} className="text-xxs text-red-400">
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}
                    </ul>
                    <button
                      onClick={(e) => handleAddImage(e)}
                      className="font-bold hover:scale-110 duration-150 ml-5"
                    >
                      ➕사진 추가하기
                    </button>
                  </div>
                </div>
              )}
              <h2 className="mb-5 text-center">
                ※글 작성 시 발견자와의 연락을 위해 회원정보에 저장된 전화번호가
                자동으로 저장됩니다.
              </h2>

              {/* 저장, 취소 버튼 */}
              <div className="text-center">
                <button className="shadow-md bg-gray-700 hover:bg-black border-gray-700 hover:border-black text-lg border-4 font-bold text-white py-1 px-2 rounded">
                  저장
                </button>

                <button
                  onClick={() => {
                    navigate(`/findboard/${findBoardId ? findBoardId : ''}`);
                  }}
                  className="shadow-md ml-3 bg-gray-700 hover:bg-black border-gray-700 hover:border-black font-bold text-lg border-4 text-white py-1 px-2 rounded"
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
                        `저장 중 에러가 발생했습니다. 에러메세지를
                        확인해주세요.`
                      </p>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
          {/* </form> */}
        </div>
      </div>

      {/* <DebugStates
        findBoard={findBoard}
        // getLoading={getLoading}
        // getError={getError}
        fieldValues={fieldValues}
      /> */}
    </>
  );
}

export default FindOwnerBoardForm;
