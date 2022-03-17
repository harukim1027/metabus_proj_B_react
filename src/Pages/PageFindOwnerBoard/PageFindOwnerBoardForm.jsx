import { useNavigate, useParams } from 'react-router-dom';
import TopNav from 'Components/Main/TopNavi';
import { useApiAxios } from 'api/base';
import FindOwnerBoardForm from 'Components/FindOwnerBoard/FindOwnerBoardForm';

function PageFindOwnerBoardForm() {
  const navigate = useNavigate();

  const { findBoardId } = useParams();

  const [{ data: findBoard, loading: getLoading, error: getError }] =
    useApiAxios(
      {
        url: `/find_owner_board/api/board/${findBoardId}/`,
        method: 'GET',
      },
      {
        manual: !findBoardId,
      },
    );

  return (
    <>
      <TopNav />
      <FindOwnerBoardForm
        findBoard={findBoard}
        findBoardId={findBoardId}
        handleDidSave={(savedPost) =>
          navigate(`/findboard/${savedPost.find_board_no}/`)
        }
      />
    </>
  );
}
export default PageFindOwnerBoardForm;
