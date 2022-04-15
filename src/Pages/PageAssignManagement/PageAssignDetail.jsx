import { useApiAxios } from 'api/base';
import AssignDetail from 'Components/AssignManagement/AssignDetail';

import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from 'Components/ErrorPage/Forbidden403';
import NewNav from 'Components/Main/NewNav';
import { useNavigate } from 'react-router-dom';

function PageAssignDetail() {
  const { assignId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: assignData }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/${assignId}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {assignData?.user.userID === auth.userID || auth.is_staff ? (
        <>
          <NewNav />
          {assignId && <AssignDetail assignId={assignId} />}
        </>
      ) : (
        <Forbidden />
      )}
      <div className="text-center mt-5">
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
export default PageAssignDetail;
