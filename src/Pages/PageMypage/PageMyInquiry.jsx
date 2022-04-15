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
      <div className="text-center">
        <button
          className="font-bold text-xl mb-5"
          onClick={() => window.history.back()}
        >
          이전으로
        </button>
      </div>
    </>
  );
}

export default PageMyInquiry;
