import ReviewCommentList from 'Components/review/ReviewCommentList';
import { useParams } from 'react-router-dom';

function PageReviewCommentList({ reviewId }) {
  // const {  } = useParams();

  return (
    <>
      <ReviewCommentList reviewId={reviewId} />
    </>
  );
}
export default PageReviewCommentList;
