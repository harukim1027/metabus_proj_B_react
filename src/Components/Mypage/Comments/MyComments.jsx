import { useApiAxios } from 'api/base';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import LoadingIndicator from 'LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';

const INIT_FIELD_VALUES = { category: '입양 다이어리' };

function MyComments() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  // 페이징
  const [query, setQuery] = useState('');
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // get 요청
  const [{ data: commentList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/comments/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const moveCategory = () => {
    fieldValues.category === '입양 다이어리' && navigate(`/mypage/mycomments`);
    fieldValues.category === '잃어버렸어요!' &&
      navigate(`/mypage/lostpetcomments/`);
    fieldValues.category === '주인 찾습니다!' &&
      navigate(`/mypage/findboardcomments/`);
  };

  useEffect(() => {
    moveCategory();
  }, [fieldValues]);

  const fetchComments = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: auth.userID,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchComments(1);
  }, []);

  const handlePageClick = (event) => {
    fetchComments(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleBTNPress = () => {
    fetchComments(1, query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchComments(1, query);
    }
  };
  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [commentList]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [commentList]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 mypage_header rounded-xl overflow-hidden sm:px-20 pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block">
              <span class="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl relative text-white">
                " 내 작성 댓글 "
              </span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
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
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다.조회하고자 하는 정보를 다시 확인해주세요.
            </div>
          )}

          <div className="mb-6 mt-10">
            <div>
              <div className=" xs:flex-none xl:flex xl:justify-between">
                <div>
                  <form
                    onSubmit={() => moveCategory()}
                    className="flex justify-center"
                  >
                    <select
                      name="category"
                      value={fieldValues.category}
                      onChange={handleFieldChange}
                      className="md:text-xl xs:text-base border-2 border-purple-400 rounded p-2 xs:w-32 md:w-60 text-center py-2"
                      defaultValue="주인 찾습니다!"
                    >
                      <option value="입양 다이어리">입양 다이어리</option>
                      <option value="잃어버렸어요!">잃어버렸어요!</option>
                      <option value="주인 찾습니다!">주인 찾습니다!</option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 overflow-hidden">
            <table className="mt-3 mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="xs:px-1 sm:px-3 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider"
                  >
                    댓글 내용
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider"
                  >
                    작성자
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
                {commentList && (
                  <>
                    {commentList.results
                      .filter((a) => a.user === auth.userID)
                      .map((review) => (
                        <tr
                          key={review.review_comment_no}
                          onClick={() => navigate(`/review/${review.review}/`)}
                          className="cursor-pointer"
                        >
                          <td className="py-4 lg:text-xl md:text-base sm:text-sm xs:text-xxs">
                            {review.review_comment_no}
                          </td>
                          <td className="py-4 font-semibold lg:text-xl md:text-md sm:text-sm xs:text-xxs">
                            <span className="bg-purple-100 rounded-full">
                              {review.comment_content.length > 15
                                ? review.comment_content.substring(0, 15) +
                                  '...'
                                : review.comment_content}
                            </span>
                          </td>
                          <td className="px-3 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs whitespace-nowrap">
                            {review.user}
                          </td>
                          <td className="py-4 sm:text-sm xs:text-xxs">
                            {review.created_at.slice(0, 10)}
                          </td>
                        </tr>
                      ))}
                  </>
                )}
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
            className="pagination_review"
          />
        </div>
      </div>
    </>
  );
}

export default MyComments;
