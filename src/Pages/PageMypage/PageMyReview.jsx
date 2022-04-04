import NewNav from 'Components/Main/NewNav';

import MyReview from 'Components/Mypage/MyReview';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyPageReview() {
  return (
    <>
      <NewNav />
      <div>
        <Sidebar />
        <div>
          <MyReview />
        </div>
      </div>
    </>
  );
}

export default PageMyPageReview;
