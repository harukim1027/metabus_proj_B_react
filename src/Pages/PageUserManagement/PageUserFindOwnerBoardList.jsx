import NewNav from 'Components/Main/NewNav';
import UserFindOwnerBoardList from 'Components/UserManagement/UserFindOwnerBoardList';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import { useParams } from 'react-router-dom';

function PageUserFindOwnerBoardList() {
  const { userId } = useParams();

  return (
    <>
      <NewNav />
      <div className="flex">
        <div className="flex-none">
          <UserManageSidebar userId={userId} />
        </div>

        <div className="flex-1">
          <UserFindOwnerBoardList userId={userId} />
        </div>
      </div>
    </>
  );
}

export default PageUserFindOwnerBoardList;
