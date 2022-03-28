import CommLostPetBoardDetail from 'Components/CommunityManagement/CommLostPetBoardDetail';
import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';

function PageCommLostPetBoardDetail() {
  const { lostpetboardId } = useParams();

  return (
    <>
      <TopNav />
      <CommLostPetBoardDetail lostpetboardId={lostpetboardId} />
    </>
  );
}

export default PageCommLostPetBoardDetail;
