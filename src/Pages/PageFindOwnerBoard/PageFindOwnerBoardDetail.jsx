import FindOwnerBoardDetail from 'Components/FindOwnerBoard/FindOwnerBoardDetail';
import NewNav from 'Components/Main/NewNav';

import { useParams } from 'react-router-dom';

function PageFindOwnerBoardDetail() {
  const { findboardId } = useParams();
  return (
    <>
      <NewNav />
      <FindOwnerBoardDetail findboardId={findboardId} />
    </>
  );
}
export default PageFindOwnerBoardDetail;
