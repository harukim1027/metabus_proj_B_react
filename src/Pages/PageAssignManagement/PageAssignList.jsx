import AssignList from 'Components/AssignManagement/AssignList';
import NewNav from 'Components/Main/NewNav';
import { useNavigate } from 'react-router-dom';

function PageAssignList() {
  const navigate = useNavigate();

  return (
    <>
      <NewNav />
      <AssignList />
      <div className="text-center">
        <button
          className="font-bold text-xl"
          onClick={() => navigate(`/admin/main/`)}
        >
          관리자 화면으로
        </button>
      </div>
    </>
  );
}

export default PageAssignList;
