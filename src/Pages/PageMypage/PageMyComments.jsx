import TopNav from 'Components/Main/TopNavi';
import MyComments from 'Components/Mypage/MyComments';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyComments() {
  return (
    <>
      <TopNav />
      <div>
        <Sidebar />
        <div>
          <MyComments />
        </div>
      </div>
    </>
  );
}

export default PageMyComments;
