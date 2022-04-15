import NewNav from 'Components/Main/NewNav';
import ReviewDetail from 'Components/review/ReviewDetail';
import { useParams } from 'react-router-dom';

function PageReviewDetail() {
  const { reviewId } = useParams();
  return (
    <>
      <NewNav />
      {reviewId && <ReviewDetail reviewId={reviewId} />}
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
export default PageReviewDetail;
