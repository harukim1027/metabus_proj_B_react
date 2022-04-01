import NewNav from 'Components/Main/NewNav';
import ReviewDetail from 'Components/review/ReviewDetail';
import { useParams } from 'react-router-dom';

function PageReviewDetail() {
  const { reviewId } = useParams();
  return (
    <>
      <NewNav />
      {reviewId && <ReviewDetail reviewId={reviewId} />}
    </>
  );
}
export default PageReviewDetail;
