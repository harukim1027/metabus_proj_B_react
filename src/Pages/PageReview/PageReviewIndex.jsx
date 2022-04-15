import NewNav from 'Components/Main/NewNav';
import Alert from 'Components/review/Alert';
import CommunitySidebar from 'Components/review/CommunimySidebar';
import Fame from 'Components/review/HallOfFame';
import ReviewList from 'Components/review/ReviewList';

function PageReviewIndex() {
  return (
    <>
      <div>
        <NewNav />
        <CommunitySidebar />

        {/* <Alert /> */}
        <ReviewList />
        {/* <Fame /> */}
      </div>
      <div className="text-center mt-5">
        <button
          className="font-bold text-xl mb-10"
          onClick={() => window.history.back()}
        >
          이전으로
        </button>
      </div>
    </>
  );
}

export default PageReviewIndex;
