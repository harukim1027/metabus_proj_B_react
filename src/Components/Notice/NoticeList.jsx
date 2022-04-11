import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import '../../App.css';
import './Notice.css';
import 'css/pagination_notice.css';
import LoadingIndicator from 'LoadingIndicator';

function NoticeList() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [{ data: noticeList, loading, error }, refetch] = useApiAxios(
    `/notice/api/notices/`,
    { manual: true },
  );
  const fetchNotices = useCallback(
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
    fetchNotices(1);
  }, []);
  const handlePageClick = (event) => {
    fetchNotices(event.selected + 1);
  };
  const getQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleBTNPress = () => {
    fetchNotices(1, query);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchNotices(1, query);
    }
  };

  //-------------
  return (
    <>
      <div>
        <div className="notice_sub_content">
          <div className="notice_pageTop2">
            <div className="tit">
              <h2 className="notice_bar_left" style={{ opacity: 1 }}>
                공지사항
              </h2>
              <p className="notice_bar_left" style={{ opacity: 1 }}>
                NOTICE
              </p>
            </div>
            {/* 첫번재 영역 */}
            <div className="leftBar notice_bar_left"></div>

            {/* 두번째 영역 */}
            <div className="rightBar notice_bar_right">
              <img src="/dog_green.png" alt="" style={{ opacity: 1 }} />
            </div>
          </div>
        </div>
        <div className="notice_board_top_info3 :before">
          <div className="info_desc">
            <p className="text-right">
              메타버스는 <br />
              사지 않고 가족이 되는 문화를 만듭니다.
            </p>
          </div>
        </div>
      </div>

      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 notice_header rounded-xl  overflow-hidden xs:px-0 sm:px-20 pt-5 pb-10 my-10 w-2/3  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <div className="notice_list"></div>
          <div className="flex xl:justify-end xs:justify-center mt-10">
            {loading && (
              <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
            )}
            {error && (
              <>
                <p className="text-red-400 mt-1">
                  &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !{' '}
                </p>
              </>
            )}
          </div>

          <br />
          <br />

          {/* 검색 필드 */}
          <div className="mb-6 mt-10">
            <div className="xs:flex-none xl:flex">
              <div className="xs:mt-5 xl:mt-0">
                <div className="flex justify-center">
                  <input
                    type="text"
                    name="query"
                    onChange={getQuery}
                    onKeyPress={handleKeyPress}
                    className="rounded bg-gray-100 focus:outline-none focus:border-gray-400 xs:w-1/2 md:w-72 text-sm px-3 py-2 mr-4 border-2"
                    placeholder="제목을 검색하세요."
                  />
                  <button
                    onClick={handleBTNPress}
                    className="rounded bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 md:text-xl  xs:text-md text-white md:w-24 xs:w-16 px-3 border-2"
                    readOnly
                  >
                    검색
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="mb-3" />

          <div className="mb-5">
            <table className="mb-5 border text-center divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    작성일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {noticeList?.results?.map((notice) => (
                  <tr
                    onClick={() => navigate(`/notice/${notice.notice_no}/`)}
                    className="cursor-pointer"
                  >
                    <td className="py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs ">
                      <div className="text-sm font-medium text-gray-900">
                        {notice.notice_no}
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="px-20 py-4 font-semibold lg:text-xl md:text-md xs:text-sm">
                        <span className="bg-yellow-100 rounded-full">
                          {notice.title.length > 20
                            ? notice.title.substring(0, 20) + '...'
                            : notice.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 xs:text-sm sm:text-base">
                      {notice.created_at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {auth.is_staff && (
              <div className="flex justify-end mr-5">
                <button
                  onClick={() => navigate('/admin/notice/new/')}
                  className="hover:scale-110 xs:w-10 sm:w-14"
                  readOnly
                >
                  <img src="/pen2.png" alt="button"></img>
                </button>
              </div>
            )}
          </div>
          <ReactPaginate
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="pagination_notice"
          />
        </div>
      </div>
      {/* <div className="notice_list2 mb-10"></div> */}
    </>
  );
}
export default NoticeList;
