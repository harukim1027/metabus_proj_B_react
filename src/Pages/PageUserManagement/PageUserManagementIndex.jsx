import NewNav from 'Components/Main/NewNav';
import { useNavigate } from 'react-router-dom';
import UserManagementIndex from 'Components/UserManagement/UserManagementIndex';

function PageUserManagementIndex() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <NewNav />
        <UserManagementIndex />
      </div>
      <div className="text-center mt-5">
        <button
          className="font-bold text-xl mb-10"
          onClick={() => navigate(`/admin/main/`)}
        >
          관리자 화면으로
        </button>
      </div>
    </>
  );
}

export default PageUserManagementIndex;
