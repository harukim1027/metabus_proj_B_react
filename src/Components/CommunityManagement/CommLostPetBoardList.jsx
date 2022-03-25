import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from 'LoadingIndicator';
import ReactPaginate from 'react-paginate';

import 'css/pagination_findBoard.css';
import '../../App.css';
import './CommunityManage.css';

function CommLostPetBoardList() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // 조회
  const [{ data: commlostpetboardList, loading, error }, refetch] = useApiAxios(
    {
      url: `/lost_pet_board/api/board/`,
      method: `GET`,
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const fetchLostPetBoard = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchLostPetBoard(1);
  }, []);

  const handlePageClick = (event) => {
    fetchLostPetBoard(event.selected + 1);
  };

  //-------------

  return (
    <>
      <div div className="header flex flex-wrap justify-center">
        <div className="CommunityManage_header rounded-xl shadow-md px-20 pt-5 pb-10 my-10 w-2/3">
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

          <div className="mb-5">
            <table className="mb-5 mt-10 border text-center min-w-full divide-y divide-gray-200 w-full whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-center text-xl font-bold text-gray-500 tracking-wider">
                    No
                  </th>
                  <th className="px-3 py-3 text-center text-xl font-bold text-gray-500 tracking-wider">
                    제목
                  </th>
                  <th className="px-3 py-3 text-center text-xl font-bold text-gray-500 tracking-wider">
                    등록 일시
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {commlostpetboardList?.results.map((commlostpetboard) => (
                  <tr
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/admin/lostpetboard/${commlostpetboard.lost_board_no}/`,
                      )
                    }
                  >
                    <td className="px-6 py-4">
                      <div>{commlostpetboard.lost_board_no}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        <span className="inline-flex text-lg leading-5 font-semibold rounded-full bg-red-200">
                          {commlostpetboard.title.length > 15
                            ? commlostpetboard.title.substring(0, 15) + '...'
                            : commlostpetboard.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">{commlostpetboard.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="pagination_lostPetBoard"
          />
        </div>
      </div>
    </>
  );
}

export default CommLostPetBoardList;
