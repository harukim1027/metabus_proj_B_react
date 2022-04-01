import FindOwnerBoardList from 'Components/FindOwnerBoard/FindOwnerBoardList';
import NewNav from 'Components/Main/NewNav';
import CommunitySidebar from 'Components/review/CommunimySidebar';

function PageFindOwnerBoardList() {
  return (
    <div>
      <NewNav />
      <CommunitySidebar />
      <FindOwnerBoardList />
    </div>
  );
}

export default PageFindOwnerBoardList;
