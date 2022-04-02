import NewNav from 'Components/Main/NewNav';
import UserAssignList from 'Components/UserManagement/UserAssignList';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import { useParams } from 'react-router-dom';

function PageUserAssignList() {
  const { userId } = useParams();

  return (
    <>
      <NewNav />
      <div className="flex">
        <div className="flex-none">
          <UserManageSidebar userId={userId} />
        </div>
        <div className="flex-1">
          <UserAssignList userId={userId} />
        </div>
      </div>
    </>
  );
}

export default PageUserAssignList;
