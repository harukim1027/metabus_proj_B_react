import LostPetBoardDetail from 'Components/LostPetBoard/LostPetBoardDetail';
import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';

function PageLostPetBoardDetail() {
  const { lostpetboardId } = useParams();

  return (
    <>
      <TopNav />
      <LostPetBoardDetail lostpetboardId={lostpetboardId} />
    </>
  );
}

export default PageLostPetBoardDetail;
