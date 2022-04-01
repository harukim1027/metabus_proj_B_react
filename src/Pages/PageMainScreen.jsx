import MainScreen from 'Components/Main/MainScreen';
import NewNav from 'Components/Main/NewNav';
import Alert from 'Components/review/Alert';
import { useAuth } from 'contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { useApiAxios } from 'api/base';
import { useEffect } from 'react';

function PageMainScreen() {
  const { auth } = useAuth();

  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/allreviews/`,
      method: 'GET',
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
      {reviewList && <Alert userID={auth.userID} reviewList={reviewList} />}
      <ToastContainer />
      <NewNav />
      <div>
        <MainScreen />
      </div>
    </>
  );
}

export default PageMainScreen;
