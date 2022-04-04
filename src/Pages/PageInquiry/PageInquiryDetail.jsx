import InquiryDetail from 'Components/inquiry/InquiryDetail';

import { useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import Sidebar from 'Components/Mypage/Sidebar';
import NewNav from 'Components/Main/NewNav';

function PageInquiryDetail() {
  const { auth } = useAuth();
  const { inquiryId } = useParams();
  return (
    <>
      <div>
        <NewNav />

        {(!auth.is_staff && (
          <div>
            <div>
              <Sidebar />
            </div>
            <div>
              <InquiryDetail inquiryId={inquiryId} />
            </div>
          </div>
        )) ||
          (auth.is_staff && <InquiryDetail inquiryId={inquiryId} />)}
      </div>
    </>
  );
}
export default PageInquiryDetail;
