import { useApiAxios } from 'api/base';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

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
      <div className=" mt-20">
        <h2>
          <h2 className=" text-2xl text-blue-500 inline ml-10">{centerId}</h2>
          에서 보호중인 동물들
        </h2>
        {loading && <LoadingIndicator />}
        {centersAnimals?.results.map((animal) => (
          <div
            className="flex justify-between shadow-lg rounded-lg ml-10 my-4 overflow-hidden w-3/4 hover:scale-110 hover:translate-x-7 duration-150 h-32 cursor-pointer"
            onClick={() => {
              navigate(`/assignment/checkanimal/${animal.announce_no}/`);
            }}
          >
            <img
              src={animal.image_url1}
              alt=""
              className="inline w-32 h-fit flex-none my-auto"
            />
            <div className="ml-4 flex-1 my-auto">
              <h2>
                품종 : {animal.kind_of_animal} &gt; {animal.breed}
              </h2>
              <h2>성별 : {animal.sex}</h2>
              <h2>나이 : {animal.age}</h2>
              <h2>특징 : {animal.info}</h2>
            </div>
            <div className="text-xl text-blue-400 my-auto">
              <h2 className="">입양신청하러 가기(클릭!)</h2>
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
        onClick={() => window.history.back()}
        className="bg-green-300 hover:bg-green-900 hover:text-white p-2 rounded-lg"
      >
        돌아가기
      </button>
    </div>
  );
}

export default CentersAnimals;
