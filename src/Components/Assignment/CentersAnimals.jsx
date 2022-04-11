import { useApiAxios } from 'api/base';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import NewNav from 'Components/Main/NewNav';

function CentersAnimals() {
  const { centerId } = useParams();
  const navigate = useNavigate();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [{ data: centersAnimals, loading, error }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/`,
      method: 'GET',
    },
    { manual: true },
  );

  const fetchAnimal = useCallback(
    async (newPage, centerId) => {
      const params = {
        page: newPage,
        centerid: centerId,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [centerId],
  );

  useEffect(() => {
    fetchAnimal(1, centerId);
  }, [centerId]);

  const handlePageClick = (event) => {
    fetchAnimal(event.selected + 1, centerId);
  };

  return (
    <div>
      <NewNav />
      <blockquote class="mt-10 text-6xl font-semibold italic text-center text-slate-900">
        <span class="mt-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block xs:text-3xl">
          <span class="relative text-white">"크루원 신청하기"</span>
        </span>
      </blockquote>
      <div className="mt-20">
        <h2 className="mb-4 text-4xl text-black flex justify-center font-bold ">
          🏠
        </h2>
        <h2>
          <h2 className=" text-2xl text-black flex justify-center font-bold ">
            {centerId}
          </h2>
          <h2 className=" text-base text-black flex justify-center ">
            &nbsp; 에서 보호중인 동물들
          </h2>
        </h2>

        <hr className="mt-5" />
        <div className="text-base text-blue-900 my-auto">
          <br />
          <h2 className="text-center font-semibold">
            {' '}
            🐶&nbsp; 입양 신청하실 아이를 선택해주세요&nbsp; 🐱{' '}
          </h2>
        </div>
        {loading && <LoadingIndicator />}
        {centersAnimals?.results
          .filter((a) => a.protect_status === '보호중')
          .map((animal) => (
            <div
              className=" mx-20 box_assign shadow-md rounded-lg my-3 overflow-hidden hover:scale-110 hover:translate-x-7 duration-150 h-45 cursor-pointer"
              onClick={() => {
                navigate(`/assignment/checkanimal/${animal.announce_no}/`);
              }}
            >
              <img
                src={animal.image_url1}
                alt="동물 이미지"
                className="w-36 h-40 mx-5"
              />
              <div className="py-5 flex-1">
                <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
                  <tr className="sm:w-full">
                    <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                      축종
                    </th>
                    <td className="">{animal.kind_of_animal}</td>
                  </tr>
                  <tr className="sm:w-full">
                    <th className="border border-slate-200 bg-gray-50 px-1 py-2 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                      품종
                    </th>
                    <td>{animal.breed}</td>
                  </tr>

                  <tr className="sm:w-full">
                    <th className="border border-slate-200 bg-gray-50 px-1 py-2 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                      성별
                    </th>
                    <td>{animal.sex}</td>
                  </tr>
                  <tr className="sm:w-full">
                    <th className="border border-slate-200 bg-gray-50 px-1 py-2 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                      나이
                    </th>
                    <td>{animal.age}</td>
                  </tr>

                  <tr className="sm:w-full">
                    <th className="border border-slate-200 bg-gray-50 px-1 py-2 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                      특징
                    </th>
                    <td>{animal.info}</td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
      </div>
      <ReactPaginate
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="pagination_animal"
      />

      <button
        onClick={() => navigate('/centermap/')}
        className="font-bold ml-10 mt-10 mb-10 bg-green-300 hover:bg-green-900 hover:text-white p-2 rounded-lg"
      >
        Back
      </button>
    </div>
  );
}

export default CentersAnimals;
