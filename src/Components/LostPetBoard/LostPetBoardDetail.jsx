import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LostPetBoardStatus from './LostPetBoardStatus';
import './LostPetBoard.css';
import '../../App.css';
import LoadingIndicator from 'LoadingIndicator';

function LostPetBoardDetail({ lostpetboardId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  // get 요청
  const [{ data: lostpetboard }, refetch] = useApiAxios(
    {
      url: `/lost_pet_board/api/board/${lostpetboardId}/`,
      method: `GET`,
    },
    { manual: true },
  );

  // delete 요청
  const [{ loading: deleteLoading, error: deleteError }, deleteLostPetboard] =
    useApiAxios(
      {
        url: `/lost_pet_board/api/board/${lostpetboardId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  // patch 요청
  const [{ loading, error }, changeAPS] = useApiAxios(
    {
      url: `/lost_pet_board/api/board/${lostpetboard?.lostpetboardId}/`,
      method: 'PATCH',
      data: { status: '찾는중' },
    },
    { manual: true },
  );

  const [
    { loading: changeStatusLoading, error: changeStatusError },
    patchLostPetboardStatus,
  ] = useApiAxios(
    {
      url: `/lost_pet_board/api/board/${lostpetboard?.lostpetboardId}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteLostPetboard().then(() => {
        navigate('/lostpetboard/');
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 review_header rounded-xl shadow-md overflow-hidden pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-3 mb-10 font-semibold italic text-center text-slate-900">
            <span className="mt-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl ">
              <span className="relative text-white">" 우리 아이 찾아요 "</span>
            </span>
          </blockquote>

          {/* 로딩 에러 */}
          {loading && (
            <>
              <p className="text-blue-400">&nbsp;&nbsp;로딩 중...</p>
            </>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          <div className="flex justify-center">
            <div className="px-4 py-5 xs:w-full sm:w-2/3">
              {lostpetboard && (
                <>
                  <h1
                    className={
                      lostpetboard.title.length > 20
                        ? 'text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'text-3xl leading-6 font-bold text-gray-900 tracking-wide'
                    }
                  >
                    {lostpetboard.title}
                  </h1>

                  <div className="my-5 text-right">
                    <span className=" font-bold">상태: </span>
                    <span
                      className=" font-bold"
                      onClick={() => {
                        auth.is_staff && setClicked(!clicked);
                      }}
                    >
                      {lostpetboard.status}
                      {auth.is_staff && <span>(수정하려면 클릭)</span>}
                    </span>
                  </div>

                  {clicked && lostpetboard && (
                    <div className="flex justify-center">
                      <LostPetBoardStatus
                        lostpetboardId={lostpetboardId}
                        lostpetboard={lostpetboard}
                        handleDidSave={(savedPost) => {
                          savedPost && window.location.reload();
                          savedPost && setClicked(0);
                          if (savedPost?.status === '찾는중') {
                            patchLostPetboardStatus({
                              data: { status: '찾는중' },
                            });
                          } else {
                            patchLostPetboardStatus({
                              data: { status: '찾았어요' },
                            });
                          }
                        }}
                      />
                    </div>
                  )}

                  <hr className="mt-3 mb-3" />

                  <div className="flex justify-center">
                    {lostpetboard.board_image && (
                      <img src={lostpetboard.board_image?.[0]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {lostpetboard.board_image && (
                      <img src={lostpetboard.board_image?.[1]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {lostpetboard.board_image && (
                      <img src={lostpetboard.board_image?.[2]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {lostpetboard.board_image && (
                      <img src={lostpetboard.board_image?.[3]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {lostpetboard.board_image && (
                      <img src={lostpetboard.board_image?.[4]?.image} alt="" />
                    )}
                  </div>

                  <ul>
                    <li>유실장소:{lostpetboard.lost_location}</li>
                    <li>동물이름:{lostpetboard.pet_name}</li>
                    <li>동물종류:{lostpetboard.animal_type}</li>
                    <li>
                      품종:{' '}
                      {lostpetboard.animal_type === '강아지'
                        ? lostpetboard.dog_breed
                        : lostpetboard.cat_breed}
                    </li>
                    <li>
                      성별:{''}
                      {lostpetboard.sex === '암컷' ? '암컷' : '수컷'}
                    </li>
                    <li>사이즈:{lostpetboard.size}</li>
                    <li>인식표:{lostpetboard.animal_tag}</li>
                  </ul>

                  {/* <div>
                    <span>혹시 이 아이 아닌가요?</span>
                    <div>
                    일단 필터를 개?고양이? and 성별, 날짜, 장소로 해서
                    </div>
                  </div> */}

                  <div className="my-5 text-right">
                    {(auth.userID === lostpetboard?.user || auth.is_staff) && (
                      <button
                        className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                        onClick={() => handleDelete()}
                      >
                        삭제
                      </button>
                    )}

                    {auth.userID === lostpetboard?.user && (
                      <Link
                        className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                        to={`/lostpetboard/${lostpetboardId}/edit/`}
                      >
                        수정
                      </Link>
                    )}

                    <Link
                      className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                      to="/lostpetboard/"
                    >
                      목록
                    </Link>

                    {deleteLoading && (
                      <LoadingIndicator>삭제 중 ...</LoadingIndicator>
                    )}
                    {deleteError && `삭제 요청 중 에러가 발생했습니다.`}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LostPetBoardDetail;
