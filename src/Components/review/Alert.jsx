import { useEffect } from 'react';

function Alert({ userID, reviewList }) {
  const date1 = new Date();
  const vdate = date1.setDate(date1.getDate() + 40);
  const date2 = new Date(
    reviewList
      ?.filter((review) => review.user.userID === userID)
      .map((date) => date.created_at)[0],
  );

  const booleantest = vdate.valueOf() > date2.valueOf();

  useEffect(() => {
    booleantest &&
      window.alert(
        '마지막 다이어리 작성일로부터 30일이 경과했습니다! 다이어리를 작성해주세요~!',
      );
  }, [reviewList]);

  // console.log('date1', date1);
  // console.log('date2', date2);

  return <></>;
}

export default Alert;
