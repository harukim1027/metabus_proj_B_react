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
      <div className="text-center">
        <button
          className="font-bold text-xl"
          onClick={() => window.history.back()}
        >
          이전으로
        </button>
      </div>
    </>
  );
}

export default PageMyComments;
