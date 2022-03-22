import ReviewCommentForm from 'Components/review/ReviewCommentForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageReviewCommentForm({ reviewId, refetch }) {
  const navigate = useNavigate();
  const { reviewCommentId } = useParams();

  return (
    <>
      <ReviewCommentForm
        reviewCommentId={reviewCommentId}
        reviewId={reviewId}
        refetch={refetch}
      />
    </>
  );
}
export default PageReviewCommentForm;
