import { toast } from 'react-toastify';

function Alert({ userID, reviewList }) {
  const date1 = new Date();
  date1.setDate(date1.getDate() + 40);
  const date2 = new Date(
    reviewList
      ?.filter((review) => review.user.userID === userID)
      .map((date) => date.created_at)[0],
  );

  if (date1.valueOf() > date2.valueOf()) {
    toast.warning('다이어리를 적은 지 30일이 지났어요! 작성해주세요!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  // console.log('date1', date1);
  // console.log('date2', date2);

  return <></>;
}

export default Alert;
