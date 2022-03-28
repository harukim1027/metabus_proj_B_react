import NewNav from 'Components/Main/NewNav';
import NoticeForm from 'Components/Notice/NoticeForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageNoticeForm() {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <NewNav />

      <NoticeForm
        noticeId={noticeId}
        handleDidSave={(savedPost) =>
          navigate(`/notice/${savedPost.notice_no}/`)
        }
      />
    </>
  );
}

export default PageNoticeForm;
