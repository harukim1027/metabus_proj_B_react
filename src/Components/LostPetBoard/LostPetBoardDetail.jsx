import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import './LostPetBoard.css';
import '../../App.css';
import LoadingIndicator from 'LoadingIndicator';
import MarkLocationMap from 'Components/Map/MarkLocationMap';
import useFieldValues from 'hooks/useFieldValues';

const INIT_FIELD_VALUES = {
  status: '',
};

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

  useEffect(() => {
    refetch();
  }, []);

  // 등록된 동물 정보를 보호센터 등록 동물 중 조회
  const [
    { data: AnimalList, loading: getLoading, error: getError },
    refetchSimilar,
  ] = useApiAxios(
    {
      url: `/streetanimal/api/animalnotpaging/`,
      method: `GET`,
      params: {
        query: lostpetboard?.lost_location.slice(0, 2),
        kind: lostpetboard?.animal_type,
        sex: lostpetboard?.sex,
        breed:
          lostpetboard?.dog_breed === '전체'
            ? lostpetboard?.cat_breed
            : lostpetboard?.dog_breed,
      },
    },
    { manual: true },
  );

  console.log(lostpetboard?.lost_location.slice(0, 2));
  useEffect(() => {
    refetchSimilar();
  }, [lostpetboard]);
  console.log('AnimalList: ', AnimalList);

  // delete 요청
  const [{ loading: deleteLoading, error: deleteError }, deleteLostboard] =
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

  // status patch 요청
  const [
    { loading: changeStatusLoading, error: changeStatusError },
    patchLostboardStatus,
  ] = useApiAxios(
    {
      url: `/lost_pet_board/api/board/${lostpetboard?.lost_board_no}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteLostboard().then(() => {
        navigate('/lostpetboard/');
        window.location.reload();
      });
    }
  };

  INIT_FIELD_VALUES.status = lostpetboard?.status;
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      formData.append(name, value);
    });
    patchLostboardStatus({
      data: formData,
    }).then(() => {
      refetch();
    });
  };

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

          {/* patch status 로딩, 에러 */}
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

                  {lostpetboard && (
                    <div className="my-5 text-right">
                      <span className=" font-bold">상태: </span>
                      {auth.userID === lostpetboard.user.userID ||
                      auth.is_staff ? (
                        <form onSubmit={handleSubmit} className="inline">
                          <select
                            name="status"
                            value={fieldValues.status}
                            onChange={handleFieldChange}
                            className="rounded px-5 py-2"
                            defaultValue={lostpetboard.status}
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
                        <span className=" font-bold">
                          {lostpetboard.status}
                        </span>
                      )}
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
                    <li>동물이름 : {lostpetboard?.pet_name}</li>
                    <li>동물종류 : {lostpetboard?.animal_type}</li>
                    <li>
                      품종 :{' '}
                      {lostpetboard?.animal_type === '개'
                        ? lostpetboard?.dog_breed
                        : lostpetboard?.cat_breed}
                    </li>
                    <li>
                      성별 : {''}
                      {lostpetboard?.sex}
                    </li>
                    <li>인식표 : {lostpetboard?.animal_tag}</li>
                    <li>주인 연락처 : {lostpetboard?.user.phone_number}</li>
                    <li>유실 시각 : {lostpetboard?.lost_time}</li>
                    <li>유실 장소 : {lostpetboard?.lost_location}</li>
                  </ul>

                  <div>
                    <MarkLocationMap location={lostpetboard?.lost_location} />
                  </div>

                  {getLoading && (
                    <LoadingIndicator>
                      로딩 중... 시간이 조금 걸립니다..
                    </LoadingIndicator>
                  )}
                  {getError && `로딩 중 에러가 발생했습니다.`}
                  <div>
                    <span>혹시 이 아이 아닌가요?</span>
                    <div>
                      {AnimalList?.length !== 0 ? (
                        AnimalList?.map((animal) => (
                          <div
                            className=" w-52 h-60 inline-block m-2 hover:scale-110 duration-150 cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/assignment/checkanimal/${animal.announce_no}/`,
                              )
                            }
                          >
                            <div className=" shadow-lg rounded-lg h-full overflow-hidden">
                              <div className=" flex justify-center h-2/3 overflow-hidden">
                                <img
                                  src={animal.image_url1}
                                  alt=""
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h2>{animal.announce_no}</h2>
                                <h2>{animal.breed}</h2>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h2>검색된 정보가 없네요..</h2>
                      )}
                    </div>
                  </div>

                  <div className="my-5 text-right">
                    {(auth.userID === lostpetboard?.user.userID ||
                      auth.is_staff) && (
                      <button
                        className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                        onClick={() => handleDelete()}
                      >
                        삭제
                      </button>
                    )}

                    {(auth.userID === lostpetboard?.user.userID ||
                      auth.is_staff) && (
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
