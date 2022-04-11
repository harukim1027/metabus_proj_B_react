import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'css/pagination_inquiry.css';
import LoadingIndicator from 'LoadingIndicator';
import './Inquiry.css';

function InquiryList() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // get요청
  const [{ data: inquiryList, loading, error, errorMessages }, refetchAll] =
    useApiAxios(
      {
        url: `/inquiry_board/api/inquiry/`,
        method: 'GET',
      },
      {
        manual: true,
      },
    );

  const fetchInquiry = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        author: auth.is_staff ? '' : auth.userID,
      };
      const { data } = await refetchAll({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchInquiry(1);
  }, []);

  const handlePageClick = (event) => {
    fetchInquiry(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleBTNPress = () => {
    fetchInquiry(1, query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchInquiry(1, query);
    }
  };

  //-------------

  return (
    <>
      <div>
        <div className="inquiry_sub_content">
          <div className="inquiry_pageTop">
            <div className="tit">
              <h2 className="inquiry_bar_left" style={{ opacity: 1 }}>
                1:1 문의
              </h2>
              <p className="inquiry_bar_left" style={{ opacity: 1 }}>
                Inquiry
              </p>
            </div>
            {/* 첫번재 영역 */}
            <div className="leftBar3 inquiry_bar_left"></div>

            {/* 두번째 영역 */}
            <div className="rightBar3 inquiry_bar_right">
              <img src="/dog_yellow.png" alt="" style={{ opacity: 1 }} />
            </div>
          </div>
        </div>
        <div className="inquiry_board_top_info :before">
          <div className="info_desc">
            <p className="text-right">
              메타버스는 <br />
              사지 않고 가족이 되는 문화를 만듭니다.
            </p>
          </div>
        </div>
      </div>

      <div className="header flex flex-wrap justify-center">
        <div className="mx-5 inquiry_header rounded-xl  overflow-hidden xs:px-0 sm:px-20 pt-5 pb-10 my-10 w-2/3  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <div className="inquiry_list"></div>
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
              <div></div>
              <div className="xs:mt-5 xl:mt-0">
                <div className="flex justify-center">
                  <input
                    type="text"
                    name="query"
                    onChange={getQuery}
                    onKeyPress={handleKeyPress}
                    className="rounded bg-gray-100 focus:outline-none focus:border-gray-400 xs:w-1/2 md:w-72 text-sm px-3 py-2 mr-4 border-2"
                    placeholder="제목, 작성자를 검색하세요."
                  />
                  <button
                    onClick={handleBTNPress}
                    className="rounded bg-yellow-400 hover:bg-yellow-700 border-yellow-400 hover:border-yellow-700 md:text-xl  xs:text-md text-white md:w-24 xs:w-16 px-3 border-2"
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
            <table className="mb-5 border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="xs:px-0 sm:px-3 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 tracking-wider"
                  >
                    No
                  </th>
                  {auth.is_staff && (
                    <th
                      scope="col"
                      className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 tracking-wider"
                    >
                      작성자
                    </th>
                  )}

                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 tracking-wider"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="px-3 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 tracking-wider"
                  >
                    문의일
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 tracking-wider"
                  >
                    답변
                  </th>
                </tr>
              </thead>
              <tbody className="bg-red divide-y divide-gray-200">
                {inquiryList?.results.map((inquiry) => (
                  <tr
                    onClick={() => navigate(`/inquiry/${inquiry.inquiry_no}/`)}
                    className="cursor-pointer"
                  >
                    <td className="py-4 xs:text-sm sm:text-lg font-medium text-gray-900">
                      {inquiry.inquiry_no}
                    </td>
                    {auth.is_staff && (
                      <td className="px-3 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm whitespace-nowrap">
                        {inquiry.user}
                      </td>
                    )}

                    <td className="px-3 py-4 font-semibold lg:text-xl md:text-md xs:text-sm">
                      <span className="bg-yellow-100 rounded-full">
                        {inquiry.title.length > 15
                          ? inquiry.title.substring(0, 15) + '...'
                          : inquiry.title}
                      </span>
                    </td>
                    <td className="py-4 xs:text-sm sm:text-base">
                      {inquiry.created_at}
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <div className="text-base font-medium text-gray-900">
                          {inquiry.admin_answer.length > 0 ? (
                            <>
                              <div className="text-sm flex justify-center">
                                <img src="/check.png" width="15" alt="" />
                              </div>
                              <span className="text-sm">답변 완료</span>
                            </>
                          ) : (
                            <>
                              <div className="text-sm flex justify-center">
                                <img src="/nocheck.png" width="15" alt="" />
                              </div>
                              <span className="text-sm">답변 대기</span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!auth.is_staff && (
              <div className="flex justify-end mr-5">
                <button
                  onClick={() => navigate('/inquiry/new/')}
                  className="hover:scale-110 xs:w-8 sm:w-14"
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
            className="pagination_inquiry"
          />
        </div>
      </div>
    </>
  );
}
export default InquiryList;
