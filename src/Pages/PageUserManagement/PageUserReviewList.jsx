import NewNav from 'Components/Main/NewNav';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import UserReviewList from 'Components/UserManagement/UserReviwList';
import { useParams } from 'react-router-dom';

function PageUserReviewList() {
  const { userId } = useParams();

  return (
    <>
      <NewNav />
      <div className="flex">
        <div className="flex-none">
          <UserManageSidebar userId={userId} />
        </div>
        <div className="flex-1">
          <UserReviewList userId={userId} />
        </div>
      </div>
    </>
  );
}

export default PageUserReviewList;
