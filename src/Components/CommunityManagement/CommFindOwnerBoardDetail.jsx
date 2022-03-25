import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from 'LoadingIndicator';
import '../../App.css';
import './CommunityManage.css';

function CommFindOwnerBoardDetail({ findboardId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 조회
  const [{ data: commfindboard, loading, error }, refetch] = useApiAxios(
    {
      url: `/find_owner_board/api/board/${findboardId}/`,
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
  const [{ loading: deleteLoading, error: deleteError }, deleteFindboard] =
    useApiAxios(
      {
        url: `/find_owner_board/api/board/${findboardId}/`,
        method: `DELETE`,
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteFindboard().then(() => {
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
            <span className="my-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-black relative inline-block">
              <span className="relative text-white">
                " 이 아이 가족 찾아요 "
              </span>
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
              {commfindboard && (
                <>
                  <h1
                    className={
                      commfindboard.title.length > 20
                        ? 'text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'text-3xl leading-6 font-bold text-gray-900 tracking-wide'
                    }
                  >
                    {commfindboard.title}
                  </h1>
                  <hr className="mt-3 mb-3" />

                  <div className="flex justify-center">
                    {commfindboard.board_image && (
                      <img src={commfindboard.board_image?.[0]?.image} alt="" />
                    )}
                  </div>

                  <ul>
                    <li>발견장소: {commfindboard.find_location}</li>
                    <li>동물종류: {commfindboard.animal_type}</li>
                    <li>
                      품종:{' '}
                      {commfindboard.animal_type === '강아지'
                        ? commfindboard.dog_breed
                        : commfindboard.cat_breed}
                    </li>
                    <li>사이즈: {commfindboard.size}</li>
                    <li>인식표: {commfindboard.animal_tag}</li>
                  </ul>
                </>
              )}

              <div className="my-5 text-right mr-5">
                <button
                  onClick={() => handleDelete()}
                  className="ml-3 flex-shrink-0 bg-gray-700 hover:bg-black border-gray-700 hover:border-black text-sm border-4 text-white py-1 px-2 rounded"
                >
                  삭제
                </button>

                <button
                  onClick={() => navigate(`/admin/findboard/`)}
                  className="ml-3 flex-shrink-0 bg-gray-700 hover:bg-black border-gray-700 hover:border-black text-sm border-4 text-white py-1 px-2 rounded"
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

export default CommFindOwnerBoardDetail;
