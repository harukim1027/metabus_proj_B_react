import TopNav from 'Components/Main/TopNavi';
import ReviewDetail from 'Components/review/ReviewDetail';
import { useParams } from 'react-router-dom';
import PageReviewCommentForm from './PageReviewCommentForm';

function PageReviewDetail() {
  const { reviewId, reviewCommentId } = useParams();
  return (
    <>
      <TopNav />
      <ReviewDetail reviewId={reviewId} reviewCommentId={reviewCommentId} />
    </>
  );
}
export default PageReviewDetail;
