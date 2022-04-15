import NewNav from 'Components/Main/NewNav';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import UserReviewList from 'Components/UserManagement/UserReviwList';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PageUserReviewList() {
  const { userId } = useParams();
  const navigate = useNavigate();
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
      <div>
        <button onClick={() => window.history.back()}>이전으로</button>
      </div>
    </>
  );
}

export default PageUserReviewList;
