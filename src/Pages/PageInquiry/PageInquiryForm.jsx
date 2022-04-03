import { useNavigate, useParams } from 'react-router-dom';
import TopNav from 'Components/Main/TopNavi';
import InquiryForm from 'Components/inquiry/InquiryForm';
import NewNav from 'Components/Main/NewNav';

function PageInquiryForm() {
  const navigate = useNavigate();
  const { inquiryId } = useParams();

  return (
    <>
      <NewNav />
      <InquiryForm
        inquiryId={inquiryId}
        handleDidSave={(savedPost) =>
          navigate(`/inquiry/${savedPost.inquiry_no}/`)
        }
      />
    </>
  );
}
export default PageInquiryForm;
