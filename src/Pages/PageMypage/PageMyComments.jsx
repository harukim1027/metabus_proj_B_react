import NewNav from 'Components/Main/NewNav';
import MyComments from 'Components/Mypage/Comments/MyComments';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyComments() {
  return (
    <>
      <NewNav />
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
