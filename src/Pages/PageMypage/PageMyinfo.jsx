import Myinfo from 'Components/Mypage/Myinfo';
import Sidebar from 'Components/Mypage/Sidebar';
import NewNav from 'Components/Main/NewNav';

function PageMyinfo() {
  return (
    <>
      <NewNav />
      <div>
        <div>
          <br />
          <Sidebar />
        </div>

        <div>
          <Myinfo />
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

export default PageMyinfo;
