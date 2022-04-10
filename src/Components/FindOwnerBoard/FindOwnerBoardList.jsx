import { useApiAxios } from 'api/base';
import { useState, useEffect, useCallback } from 'react';
import FindOwnerBoardSummary from './FindOwnerBoardSummary';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import 'css/pagination_findBoard.css';
import LoadingIndicator from 'LoadingIndicator';

const INIT_FIELD_VALUES = { category: '전체' };

function FindOwnerBoardList() {
  const { auth } = useAuth();
  const [query, setQuery] = useState('');
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const [{ data: findBoardList, loading, error }, refetch] = useApiAxios(
    {
      url: `/find_owner_board/api/board/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  // 검색을 위한 초기값 설정
  const [searchLocation, setSearchLocation] = useState('');
  const [searchAnimal, setSearchAnimal] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const fetchFindBoard = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        location: searchLocation,
        animaltype: searchAnimal,
        status: searchStatus,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query, searchLocation, searchAnimal, searchStatus],
  );

  useEffect(() => {
    fetchFindBoard(1);
  }, []);

  const handlePageClick = (event) => {
    fetchFindBoard(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleBTNPress = () => {
    fetchFindBoard(1, query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchFindBoard(1, query);
    }
  };

  //-------------

  return (
    <>
      <div>
        <div className="sub_content">
          <div className="find_pageTop2">
            <div className="tit">
              <h2
                className="find_bar_left font-extrabold "
                style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
              >
                이 아이, 주인 찾아요 🙀
              </h2>
              <p
                className="find_bar_left"
                style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
              >
                Finding Owner
              </p>
            </div>
            {/* 첫번재 영역 */}
            <div
              className="leftBar find_bar_left"
              style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
            ></div>

            {/* 두번째 영역 */}
            <div
              className="rightBar find_bar_right"
              style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
            >
              <img src="/pet-hand_blue.png" alt="" style={{ opacity: 1 }} />
            </div>
          </div>
        </div>
        <div className="find_board_top_info3 :before">
          <div className="info_desc">
            <p className="text-right">
              메타버스는 <br />
              사지 않고 가족이 되는 문화를 만듭니다.
            </p>
          </div>
        </div>
      </div>
      <div className="find_list"></div>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 notice_header rounded-xl overflow-hidden xs:px-0 sm:px-20 pt-5 pb-10 my-10 w-2/3  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <div className="flex xl:justify-end xs:justify-center">
            {loading && (
              <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
            )}
            {error && (
              <>
                <p className="text-red-400 mt-1">
                  &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. ! (조회된 정보가
                  없습니다.)
                </p>
              </>
            )}
          </div>

          {/* 검색 필드 */}
          <div className="mb-6 mt-10">
            <div>
              <div className=" xs:flex-none xl:flex xl:justify-between">
                {/* 발견 장소 선택 */}
                <div>
                  <form className="flex justify-center">
                    <select
                      name="find_location"
                      value={fieldValues.find_location}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="md:text-xl xs:text-base border-2 border-black rounded p-2 xs:w-32 md:w-60 text-center py-2"
                      defaultValue="발견 장소"
                    >
                      <option value="">발견 장소</option>
                      <option value="서울">서울</option>
                      <option value="부산">부산</option>
                      <option value="대구">대구</option>
                      <option value="인천">인천</option>
                      <option value="광주">광주</option>
                      <option value="대전">대전</option>
                      <option value="울산">울산</option>
                      <option value="세종">세종</option>
                      <option value="경기">경기</option>
                      <option value="강원">강원</option>
                      <option value="충북">충북</option>
                      <option value="충남">충남</option>
                      <option value="전북">전북</option>
                      <option value="전남">전남</option>
                      <option value="경북">경북</option>
                      <option value="경남">경남</option>
                      <option value="제주">제주</option>
                    </select>
                  </form>
                </div>

                {/* 동물 종류 선택 */}
                <div>
                  <form className="flex justify-center">
                    <select
                      name="animal_type"
                      value={fieldValues.animal_type}
                      onChange={(e) => setSearchAnimal(e.target.value)}
                      className="md:text-xl xs:text-base border-2 border-black rounded p-2 xs:w-32 md:w-60 text-center py-2"
                      defaultValue="동물 종류"
                    >
                      <option value="">동물 종류</option>
                      <option value="개">개</option>
                      <option value="고양이">고양이</option>
                    </select>
                  </form>
                </div>

                {/* 상태 선택 */}
                <div>
                  <form className="flex justify-center">
                    <select
                      name="status"
                      value={fieldValues.status}
                      onChange={(e) => setSearchStatus(e.target.value)}
                      className="md:text-xl xs:text-base border-2 border-black rounded p-2 xs:w-32 md:w-60 text-center py-2"
                      defaultValue="상태 선택"
                    >
                      <option value="">상태 선택</option>
                      <option value="찾는중">찾는중</option>
                      <option value="찾았어요">찾았어요</option>
                    </select>
                  </form>
                </div>

                <div className="flex justify-center xs:mt-5 xl:mt-0">
                  <button
                    onClick={handleBTNPress}
                    className="rounded bg-gray-700 hover:bg-black border-gray-700 hover:border-black md:text-xl  xs:text-md text-white md:w-24 xs:w-16 px-3 border-2"
                    readOnly
                  >
                    검색
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr className="mb-3" />

          <div className="flex flex-wrap justify-center rounded mb-20 mt-10">
            {findBoardList?.results.map((findboard) => (
              <div
                key={findboard.find_board_no}
                className="transition-transform hover:-translate-y-5 duration-300 my-5 rounded-xl mx-5 mb-3 w-44 h-60 overflow-hidden shadow-lg inline"
              >
                <FindOwnerBoardSummary findboard={findboard} />
              </div>
            ))}
          </div>

          {auth.isLoggedIn && !auth.is_staff && (
            <div className="flex justify-end mr-5">
              <button
                onClick={() => navigate('/findboard/new/')}
                className="hover:scale-110 xs:w-10 sm:w-14"
                readOnly
              >
                <img src="/pen2.png" alt="button"></img>
              </button>
            </div>
          )}
          <ReactPaginate
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="pagination_findBoard"
          />
        </div>
      </div>
    </>
  );
}
export default FindOwnerBoardList;
