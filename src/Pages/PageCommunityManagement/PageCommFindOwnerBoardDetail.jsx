import CommFindOwnerBoardDetail from 'Components/CommunityManagement/CommFindOwnerBoardDetail';
import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';

function PageCommFindOwnerBoardDetail() {
  const { findboardId } = useParams();

  return (
    <>
      <TopNav />
      <CommFindOwnerBoardDetail findboardId={findboardId} />
    </>
  );
}

export default PageCommFindOwnerBoardDetail;
