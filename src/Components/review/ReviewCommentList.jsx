import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReviewCommentDetail from './ReviewCommentDetail';
import ReviewCommentForm from './ReviewCommentForm';

function ReviewCommentList({ reviewId }) {
  const [{ data: review, loading, error }, refetch] = useApiAxios(
    `/adopt_review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  console.log('review:', review);

  return (
    <>
      {review?.comments.map((comment) => (
        <div>
          {comment.comment_content} by.{comment.user}
          <ReviewCommentDetail
            comment={comment}
            reviewId={reviewId}
            refetch={refetch}
          />
        </div>
      ))}

      <ReviewCommentForm
        refetch={refetch}
        review={review}
        reviewId={reviewId}
      />
    </>
  );
}

export default ReviewCommentList;
