import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './FindOwnerBoard.css';
import '../../App.css';
import LoadingIndicator from 'LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import MarkLocationMap from 'Components/Map/MarkLocationMap';
import FindOwnerBoardCommentList from './FindOwnerBoardCommentList';

const INIT_FIELD_VALUES = {
  status: '',
};

function FindOwnerBoardDetail({ findboardId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // get 요청
  const [{ data: findboard }, refetch] = useApiAxios(
    {
      url: `/find_owner_board/api/board/${findboardId}/`,
      method: `GET`,
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [findboardId]);

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

  // status patch 요청
  const [
    { loading: changeStatusLoading, error: changeStatusError },
    patchFindboardStatus,
  ] = useApiAxios(
    {
      url: `/find_owner_board/api/board/${findboardId}/`,
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
      });
    }
  };

  INIT_FIELD_VALUES.status = findboard?.status;
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);
  // // console.log(fieldValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      formData.append(name, value);
    });
    patchFindboardStatus({
      data: formData,
    }).then(() => {
      refetch();
    });
  };

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 review_header rounded-xl overflow-hidden pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-3 mb-10 font-semibold italic text-center text-slate-900">
            <span className="mt-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-black relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl ">
              <span className="relative text-white">
                " 이 아이 가족찾아요 "
              </span>
            </span>
          </blockquote>

          {/* 로딩 에러 */}
          {changeStatusLoading && (
            <>
              <p className="text-blue-400">&nbsp;&nbsp;로딩 중...</p>
            </>
          )}
          {changeStatusError && (
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
                    {auth.userID === findboard.user.userID || auth.is_staff ? (
                      <form onSubmit={handleSubmit} className="inline">
                        <select
                          name="status"
                          value={fieldValues.status}
                          onChange={handleFieldChange}
                          className="rounded px-5 py-2"
                          // defaultValue={findboard.status}
                        >
                          <option value="">상태 변경</option>
                          <option value="찾는중">찾는중</option>
                          <option value="찾았어요">찾았어요</option>
                        </select>

                        <button className="bg-gray-300 hover:bg-gray-800 hover:text-white rounded-md px-2 py-1 ml-3">
                          저장
                        </button>
                      </form>
                    ) : (
                      <span className=" font-bold">{findboard.status}</span>
                    )}
                  </div>

                  <hr className="mt-3 mb-3" />

                  <div className="text-right mb-5">
                    글쓴이 :{' '}
                    <span className="font-semibold">
                      {findboard.user.nickname}
                    </span>
                  </div>
                  <div className="border-2 p-2 rounded-md mb-5">
                    <h2 className="text-lg font-semibold mb-10 ml-5">
                      {findboard.content}
                    </h2>
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
                  </div>

                  <div className="border-2 rounded-md mb-5 py-2 px-3">
                    <ul>
                      <li>동물종류: {findboard.animal_type}</li>
                      <li>
                        품종:{' '}
                        {findboard.animal_type === '개'
                          ? findboard.dog_breed
                          : findboard.cat_breed}
                      </li>
                      <li>인식표: {findboard.animal_tag}</li>
                      <li>발견자 연락처 : {findboard.user.phone_number}</li>
                      <li>발견 시각 : {findboard.find_time}</li>
                      <li>발견장소: {findboard.find_location}</li>
                    </ul>
                  </div>

                  <div>
                    <MarkLocationMap location={findboard.find_location} />
                  </div>
                  <hr className="mt-3 mb-3" />
                  {/* 댓글 */}
                  <>
                    <FindOwnerBoardCommentList
                      findboardId={findboardId}
                      refetch={refetch}
                    />
                  </>
                  <hr className="mt-3 mb-3" />

                  {/*  */}

                  <div className="my-5 text-right">
                    {(auth.userID === findboard?.user.userID ||
                      auth.is_staff) && (
                      <button
                        className="ml-3 flex-shrink-0 bg-gray-700 hover:bg-black border-gray-700 hover:border-black text-sm border-4 text-white py-1 px-2 rounded"
                        onClick={() => handleDelete()}
                      >
                        삭제
                      </button>
                    )}

                    {auth.userID === findboard?.user.userID && (
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
