import Sidebar from 'Components/Mypage/Sidebar';
import NewNav from 'Components/Main/NewNav';
import MyinfoForm from 'Components/Mypage/MyinfoForm';

function PageMyinfoForm() {
  return (
    <>
      <NewNav />
      <div>
        <div className="mt-10">
          <Sidebar />
        </div>

        <div>
          <MyinfoForm />
        </div>
      </div>
    </>
  );
}

export default PageMyinfoForm;
