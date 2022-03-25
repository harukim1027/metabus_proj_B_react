import NewNav from 'Components/Main/NewNav';

import NoticeDetail from 'Components/Notice/NoticeDetail';
import { useParams } from 'react-router-dom';

function PageNoticeDetail() {
  const { noticeId } = useParams();

  return (
    <>
      <NewNav />

      <NoticeDetail noticeId={noticeId} />
    </>
  );
}

export default PageNoticeDetail;
