import FindOwnerBoardDetail from 'Components/FindOwnerBoard/FindOwnerBoardDetail';
import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';

function PageFindOwnerBoardDetail() {
  const { findboardId } = useParams();
  return (
    <>
      <TopNav />
      <FindOwnerBoardDetail findboardId={findboardId} />
    </>
  );
}
export default PageFindOwnerBoardDetail;
