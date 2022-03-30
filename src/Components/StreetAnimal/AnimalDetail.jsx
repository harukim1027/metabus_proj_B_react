import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import LoadingIndicator from 'LoadingIndicator';

function AnimalDetail({ animalId }) {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [{ data: animal, loading, error }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${animalId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },

    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteAnimal] =
    useApiAxios(
      {
        url: `/streetanimal/api/animal/${animalId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteAnimal().then(() => {
        navigate('/admin/animal/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [animal]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [animal]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block">
              <span class="relative text-white">" 동물 정보 "</span>
            </span>
          </blockquote>

          {loading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          <div className="my-5 overflow-hidden">
            {animal && (
              <>
                <div className="flex justify-center">
                  {animal.image && (
                    <img
                      src={animal.image}
                      alt="동물 이미지가 없습니다."
                      className="h-96"
                    />
                  )}
                </div>
                <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      공고번호
                    </th>
                    <td>{animal.announce_no}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      동물 종류
                    </th>
                    <td>{animal.kind_of_animal}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      품종
                    </th>
                    <td>{animal.breed}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      털색
                    </th>
                    <td>{animal.color}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      성별
                    </th>
                    <td>{animal.sex}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      중성화여부
                    </th>
                    <td>{animal.neutering}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      특징
                    </th>
                    <td>{animal.info}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      접수 일시
                    </th>
                    <td>{animal.date_time_of_receipt}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      구조 사유
                    </th>
                    <td>{animal.reason_for_rescue}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      발생 장소
                    </th>
                    <td>{animal.place_of_discovery}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      공고 기간
                    </th>
                    <td>{animal.period_of_announcement}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      보호 장소
                    </th>
                    <td>{animal.shelter}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      담당자/담당시설
                    </th>
                    <td>{animal.person_in_charge}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      특이사항
                    </th>
                    <td>{animal.significant}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      관할 보호센터명
                    </th>
                    <td>{animal.center_name.center_name}</td>
                  </tr>
                </table>
              </>
            )}
          </div>

          <div className="my-5 text-right">
            {auth.is_staff && (
              <>
                <button
                  disabled={deleteLoading}
                  onClick={handleDelete}
                  className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  삭제
                </button>
                <Link
                  to={`/admin/animal/${animalId}/edit/`}
                  className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  수정
                </Link>

                <Link
                  to="/admin/animal/"
                  className="mr-6 ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  목록
                </Link>

                <div>
                  {deleteLoading && (
                    <LoadingIndicator>&nbsp;&nbsp;삭제 중 ...</LoadingIndicator>
                  )}
                  {deleteError && `삭제 요청 중 에러가 발생했습니다.`}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimalDetail;
