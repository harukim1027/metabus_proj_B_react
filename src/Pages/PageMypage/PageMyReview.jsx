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
      <div className="text-center mt-5">
        <button
          className="font-bold text-xl mb-10"
          onClick={() => window.history.back()}
        >
          이전으로
        </button>
      </div>
    </>
  );
}

export default PageMyPageReview;
