import NewNav from 'Components/Main/NewNav';
import UserInquiryList from 'Components/UserManagement/UserInquiryList';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import { useParams } from 'react-router-dom';

function PageUserInquiryList() {
  const { userId } = useParams();

  return (
    <>
      <NewNav />
      <div className="flex">
        <div className="flex-none">
          <UserManageSidebar userId={userId} />
        </div>
        <div className="flex-1">
          <UserInquiryList userId={userId} />
        </div>
      </div>
    </>
  );
}

export default PageUserInquiryList;
