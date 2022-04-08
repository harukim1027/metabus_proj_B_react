import MainScreen from 'Components/Main/MainScreen';
import NewNav from 'Components/Main/NewNav';
import Alert from 'Components/review/Alert';
import { useAuth } from 'contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';

function PageMainScreen() {
  const { auth } = useAuth();
  const [activeCount, setActiveCount] = useState(1);

  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/allreviews/`,
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <NewNav
        activeCount={activeCount}
        setActiveCount={setActiveCount}
        userID={auth.userID}
        reviewList={reviewList}
      />
      <div>
        <MainScreen activeCount={activeCount} setActiveCount={setActiveCount} />
      </div>
    </>
  );
}

export default PageMainScreen;
