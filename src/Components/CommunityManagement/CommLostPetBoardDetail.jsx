import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LostPetBoardStatus from '../LostPetBoard/LostPetBoardStatus';
import LoadingIndicator from 'LoadingIndicator';
import '../../App.css';
import './CommunityManage.css';

function CommLostPetBoardDetail({ lostpetboard, lostpetboardId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  // 조회
  const [{ data: commlostpetboard }, refetch] = useApiAxios(
    {
      url: `/lost_pet_board/api/board/${lostpetboardId}/`,
      method: `GET`,
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  //  DELETE 요청
  const [{ loading: deleteLoading, error: deleteError }, deleteLostPetboard] =
    useApiAxios(
      {
        url: `/lost_pet_board/api/board/${lostpetboardId}/`,
        method: `DELETE`,
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
    patchCommLostPetboardStatus,
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
        // changeAPS().then(() => {    일단 보류 나중에 상태 추가예정.
        navigate('/admin/findboard/');
        window.location.reload();
        // });
      });
    }
  };

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 CommunityManage_header rounded-xl shadow-md overflow-hidden md:px-20 sm:px-0 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span className="my-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block">
              <span className="relative text-white">" 우리 아이 찾아요 "</span>
            </span>
          </blockquote>

          {/* 로딩 에러 */}
          {loading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}

          <div className="flex justify-center">
            <div className="px-4 py-5 xs:w-full sm:w-2/3">
              {commlostpetboard && (
                <>
                  <h1
                    className={
                      commlostpetboard.title.length > 20
                        ? 'text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'text-3xl leading-6 font-bold text-gray-900 tracking-wide'
                    }
                  >
                    {commlostpetboard.title}
                  </h1>

                  <div className="my-5 text-right">
                    <span className=" font-bold">상태: </span>
                    <span
                      className=" font-bold"
                      onClick={() => {
                        auth.is_staff && setClicked(!clicked);
                      }}
                    >
                      {commlostpetboard.status}{' '}
                      {auth.is_staff && <span>(수정하려면 클릭)</span>}
                    </span>
                  </div>

                  {clicked && commlostpetboard && (
                    <div className="flex justify-center">
                      <LostPetBoardStatus
                        lostpetboardId={lostpetboardId}
                        lostpetboard={lostpetboard}
                        handleDidSave={(savedPost) => {
                          savedPost && window.location.reload();
                          savedPost && setClicked(0);
                          if (savedPost?.status === '찾는중') {
                            patchCommLostPetboardStatus({
                              data: { status: '찾는중' },
                            });
                          } else {
                            patchCommLostPetboardStatus({
                              data: { status: '찾았어요' },
                            });
                          }
                        }}
                      />
                    </div>
                  )}

                  <hr className="mt-3 mb-3" />

                  <div className="flex justify-center">
                    {commlostpetboard.board_image && (
                      <img
                        src={commlostpetboard.board_image?.[0]?.image}
                        alt=""
                      />
                    )}
                  </div>

                  <ul>
                    <li>유실장소: {commlostpetboard.find_location}</li>
                    <li>동물종류: {commlostpetboard.animal_type}</li>
                    <li>
                      품종:{' '}
                      {commlostpetboard.animal_type === '강아지'
                        ? commlostpetboard.dog_breed
                        : commlostpetboard.cat_breed}
                    </li>
                    <li>사이즈: {commlostpetboard.size}</li>
                    <li>인식표: {commlostpetboard.animal_tag}</li>
                  </ul>
                </>
              )}

              <div className="my-5 text-right mr-5">
                <button
                  onClick={() => handleDelete()}
                  className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  삭제
                </button>

                <button
                  onClick={() => navigate(`/admin/lostpetboard/`)}
                  className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  목록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommLostPetBoardDetail;
