import { useNavigate } from 'react-router-dom';
import InquiryList from 'Components/inquiry/InquiryList';

import { useAuth } from 'contexts/AuthContext';
import NewNav from 'Components/Main/NewNav';

function PageInquiryIndex() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="header">
      <NewNav />
      <InquiryList />
    </div>
  );
}

export default PageInquiryIndex;
