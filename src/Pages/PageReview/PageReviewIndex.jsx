import NewNav from 'Components/Main/NewNav';
import Alert from 'Components/review/Alert';
import Fame from 'Components/review/HallOfFame';
import ReviewList from 'Components/review/ReviewList';

function PageReviewIndex() {
  return (
    <div>
      <NewNav />

      <Fame />

      <Alert />
      <ReviewList />
    </div>
  );
}

export default PageReviewIndex;
