import ReviewCommentDetail from 'Components/review/ReviewCommentDetail';
import { useParams } from 'react-router-dom';

function PageReviewCommentDetail({ reviewId, refetch, comment }) {
  const { reviewCommentId } = useParams();

  // console.log('comment:', comment);
  // console.log('reviewId:', reviewId);
  // console.log('refetch:', refetch);
  // console.log('reviewCommentId:', reviewCommentId);

  return (
    <>
      <ReviewCommentDetail
        reviewCommentId={reviewCommentId}
        reviewId={reviewId}
        refetch={refetch}
        comment={comment}
      />
    </>
  );
}
export default PageReviewCommentDetail;
