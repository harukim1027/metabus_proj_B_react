import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Alert({ userID }) {
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

  const date1 = new Date();
  date1.setDate(date1.getDate() - 30);
  const date2 = new Date(
    reviewList?.map((inf) => inf?.user?.userID === userID && inf?.created_at),
  );

  if (date1.valueOf() > date2.valueOf()) {
    toast.success('다이어리를 적은 지 30일이 지났어요! 작성해주세요!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  console.log('date1', date1);
  console.log('date2', date2);

  return <></>;
}

export default Alert;
