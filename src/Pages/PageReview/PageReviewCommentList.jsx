import ReviewCommentList from 'Components/review/ReviewCommentList';
import { useParams } from 'react-router-dom';

function PageReviewCommentList({ reviewId, refetch, review }) {
  const { reviewCommentId } = useParams();

  return (
    <>
      <ReviewCommentList
        reviewCommentId={reviewCommentId}
        reviewId={reviewId}
        refetch={refetch}
      />
    </>
  );
}
export default PageReviewCommentList;
