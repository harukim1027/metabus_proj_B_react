import { useApiAxios } from 'api/base';
import AssignComp from 'Components/Assignment/AssignComp';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from 'Components/ErrorPage/Forbidden403';
import NewNav from 'Components/Main/NewNav';

function PageAssignComp() {
  const { assignId } = useParams();
  const { auth } = useAuth();
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
      {assignData?.user.userID === auth.userID ? (
        <>
          <NewNav />
          <AssignComp assginId={assignId} assignData={assignData} />
        </>
      ) : (
        <Forbidden />
      )}
    </>
  );
}

export default PageAssignComp;
