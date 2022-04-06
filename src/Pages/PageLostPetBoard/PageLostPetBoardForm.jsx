import { useApiAxios } from 'api/base';
import LostPetBoardForm from 'Components/LostPetBoard/LostPetBoardForm';
import TopNav from 'Components/Main/TopNavi';
import { useNavigate, useParams } from 'react-router-dom';

function PageLostPetBoardForm() {
  const navigate = useNavigate();

  const { lostpetboardId } = useParams();

  const [{ data: lostpetboard, loading: getLoading, error: getError }] =
    useApiAxios(
      {
        url: `/lost_pet_board/api/board/${lostpetboardId}/`,
        method: 'GET',
      },
      {
        manual: !lostpetboardId,
      },
    );
  return (
    <>
      <LostPetBoardForm
        lostpetboard={lostpetboard}
        lostpetboardId={lostpetboardId}
        handleDidSave={(savedPost) =>
          navigate(`/lostpetboard/${savedPost.lost_board_no}/`)
        }
      />
    </>
  );
}

export default PageLostPetBoardForm;
