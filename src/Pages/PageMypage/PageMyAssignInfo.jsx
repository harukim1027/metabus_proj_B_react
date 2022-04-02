import NewNav from 'Components/Main/NewNav';
import MyAssignInfo from 'Components/Mypage/MyAssignInfo';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyAssignInfo() {
  return (
    <>
      <NewNav />
      <div className="">
        <Sidebar />
        <div className="flex-1">
          <MyAssignInfo />
        </div>
      </div>
    </>
  );
}

export default PageMyAssignInfo;
