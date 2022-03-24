import ReviewCommentForm from 'Components/review/ReviewCommentForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageReviewCommentForm({ reviewId, refetch, editCommentId }) {
  // const { editCommentId } = useParams();
  return (
    <>
      <ReviewCommentForm
        editCommentId={editCommentId}
        reviewId={reviewId}
        refetch={refetch}
      />
    </>
  );
}
export default PageReviewCommentForm;
