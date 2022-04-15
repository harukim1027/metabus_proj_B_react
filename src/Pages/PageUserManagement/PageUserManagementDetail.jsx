import NewNav from 'Components/Main/NewNav';

import UserManagementDetail from 'Components/UserManagement/UserManagementDetail';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PageUserManagementDetail() {
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
          <UserManagementDetail userId={userId} />
        </div>
      </div>
    </>
  );
}

export default PageUserManagementDetail;
