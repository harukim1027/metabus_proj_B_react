import { useNavigate, useParams } from 'react-router-dom';

import { useApiAxios } from 'api/base';
import FindOwnerBoardForm from 'Components/FindOwnerBoard/FindOwnerBoardForm';
import NewNav from 'Components/Main/NewNav';

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
      <NewNav />
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
