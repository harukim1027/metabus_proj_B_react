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

export default PageUserManagementIndex;
