import LostPetBoardDetail from 'Components/LostPetBoard/LostPetBoardDetail';
import NewNav from 'Components/Main/NewNav';
import { useParams } from 'react-router-dom';

function PageLostPetBoardDetail() {
  const { lostpetboardId } = useParams();

  return (
    <>
      <NewNav />
      <LostPetBoardDetail lostpetboardId={lostpetboardId} />
    </>
  );
}

export default PageLostPetBoardDetail;
