import { useApiAxios } from 'api/base';
import AssignmentForm from 'Components/Assignment/AssignmentForm';
import NewNav from 'Components/Main/NewNav';

import { useNavigate } from 'react-router-dom';

function PageAssignmentform() {
  const navigate = useNavigate();
  return (
    <>
      <NewNav />
      <AssignmentForm
        handleDidSave={(savedPost) => {
          navigate(`/assignment/complite/${savedPost.assignment_no}/`);
        }}
      />
    </>
  );
}

export default PageAssignmentform;
