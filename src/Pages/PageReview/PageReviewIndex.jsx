import NewNav from 'Components/Main/NewNav';
import Alert from 'Components/review/Alert';
import CommunitySidebar from 'Components/review/CommunimySidebar';
import Fame from 'Components/review/HallOfFame';
import ReviewList from 'Components/review/ReviewList';

function PageReviewIndex() {
  return (
    <div>
      <NewNav />
      <CommunitySidebar />

      {/* <Fame />

      <Alert /> */}
      <ReviewList />
    </div>
  );
}

export default PageReviewIndex;
