import { useNavigate } from 'react-router-dom';
import InquiryList from 'Components/inquiry/InquiryList';

import { useAuth } from 'contexts/AuthContext';
import NewNav from 'Components/Main/NewNav';

function PageInquiryIndex() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  return (
    <div className="header">
      <NewNav />
      <InquiryList />
    </div>
  );
}

export default PageInquiryIndex;
