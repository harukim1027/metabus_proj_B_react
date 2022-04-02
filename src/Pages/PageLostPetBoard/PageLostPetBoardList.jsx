import LostPetBoardList from 'Components/LostPetBoard/LostPetBoardList';
import NewNav from 'Components/Main/NewNav';
import CommunitySidebar from 'Components/review/CommunimySidebar';

function PageLostPetBoardList() {
  return (
    <>
      <NewNav />
      <CommunitySidebar />
      <LostPetBoardList />
    </>
  );
}

export default PageLostPetBoardList;
