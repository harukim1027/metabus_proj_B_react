import Sidebar from 'Components/Mypage/Sidebar';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import InquiryList from 'Components/inquiry/InquiryList';
import NewNav from 'Components/Main/NewNav';

function PageMyInquiry() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <NewNav />
      <div>
        <Sidebar />
        <div>
          <InquiryList />
        </div>
      </div>
    </>
  );
}

export default PageMyInquiry;
