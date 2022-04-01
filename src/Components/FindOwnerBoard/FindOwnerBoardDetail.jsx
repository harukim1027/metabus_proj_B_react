import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FindBoardStatus from './FindBoardStatus';
import './FindOwnerBoard.css';
import '../../App.css';
import LoadingIndicator from 'LoadingIndicator';

function FindOwnerBoardDetail({ findboardId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  // get 요청
  const [{ data: findboard }, refetch] = useApiAxios(
    {
      url: `/find_owner_board/api/board/${findboardId}/`,
      method: `GET`,
    },
    { manual: true },
  );

  // delete 요청
  const [{ loading: deleteLoading, error: deleteError }, deleteFindboard] =
    useApiAxios(
      {
        url: `/find_owner_board/api/board/${findboardId}/`,
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
      url: `/find_owner_board/api/board/${findboard?.findboardId}/`,
      method: 'PATCH',
      data: { status: '찾는중' },
    },
    { manual: true },
  );

  const [
    { loading: changeStatusLoading, error: changeStatusError },
    patchFindboardStatus,
  ] = useApiAxios(
    {
      url: `/find_owner_board/api/board/${findboard?.findboardId}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteFindboard().then(() => {
        navigate('/findboard/');
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
            <span className="mt-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-black relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl ">
              <span className="relative text-white">
                " 이 아이 가족찾아요 "
              </span>
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
              {findboard && (
                <>
                  <h1
                    className={
                      findboard.title.length > 20
                        ? 'text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'text-3xl leading-6 font-bold text-gray-900 tracking-wide'
                    }
                  >
                    {findboard.title}
                  </h1>

                  <div className="my-5 text-right">
                    <span className=" font-bold">상태: </span>
                    <span
                      className=" font-bold"
                      onClick={() => {
                        auth.is_staff && setClicked(!clicked);
                      }}
                    >
                      {findboard.status}
                      {auth.is_staff && <span>(수정하려면 클릭)</span>}
                    </span>
                  </div>

                  {clicked && findboard && (
                    <div className="flex justify-center">
                      <FindBoardStatus
                        findboardId={findboardId}
                        findboard={findboard}
                        handleDidSave={(savedPost) => {
                          savedPost && window.location.reload();
                          savedPost && setClicked(0);
                          if (savedPost?.status === '찾는중') {
                            patchFindboardStatus({
                              data: { status: '찾는중' },
                            });
                          } else {
                            patchFindboardStatus({
                              data: { status: '찾았어요' },
                            });
                          }
                        }}
                      />
                    </div>
                  )}

                  <hr className="mt-3 mb-3" />

                  <div className="flex justify-center">
                    {findboard.board_image && (
                      <img src={findboard.board_image?.[0]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {findboard.board_image && (
                      <img src={findboard.board_image?.[1]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {findboard.board_image && (
                      <img src={findboard.board_image?.[2]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {findboard.board_image && (
                      <img src={findboard.board_image?.[3]?.image} alt="" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {findboard.board_image && (
                      <img src={findboard.board_image?.[4]?.image} alt="" />
                    )}
                  </div>

                  <ul>
                    <li>발견장소: {findboard.find_location}</li>
                    <li>동물종류: {findboard.animal_type}</li>
                    <li>
                      품종:{' '}
                      {findboard.animal_type === '강아지'
                        ? findboard.dog_breed
                        : findboard.cat_breed}
                    </li>
                    <li>사이즈: {findboard.size}</li>
                    <li>인식표: {findboard.animal_tag}</li>
                  </ul>

                  <div className="my-5 text-right">
                    {(auth.userID === findboard?.user || auth.is_staff) && (
                      <button
                        className="ml-3 flex-shrink-0 bg-gray-700 hover:bg-black border-gray-700 hover:border-black text-sm border-4 text-white py-1 px-2 rounded"
                        onClick={() => handleDelete()}
                      >
                        삭제
                      </button>
                    )}

                    {auth.userID === findboard?.user && (
                      <Link
                        className="ml-3 flex-shrink-0 bg-gray-700 hover:bg-black border-gray-700 hover:border-black text-sm border-4 text-white py-1 px-2 rounded"
                        to={`/findboard/${findboardId}/edit/`}
                      >
                        수정
                      </Link>
                    )}

                    <Link
                      className="ml-3 flex-shrink-0 bg-gray-700 hover:bg-black border-gray-700 hover:border-black text-sm border-4 text-white py-1 px-2 rounded"
                      to="/findboard/"
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

export default FindOwnerBoardDetail;
