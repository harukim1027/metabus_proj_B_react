import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import PageReviewCommentDetail from 'Pages/PageReview/PageReviewCommentDetail';
import PageReviewCommentForm from 'Pages/PageReview/PageReviewCommentForm';
import ReviewCommentDetail from './ReviewCommentDetail';

function ReviewCommentList({ reviewId }) {
  const { auth } = useAuth();

  // 댓글 리스트
  const [{ data: review, loading, error }, refetch] = useApiAxios(
    `/adopt_review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {review?.comments.map((comment) => (
        <div>
          {comment.comment_content} by.{comment.user}
          <ReviewCommentDetail
            reviewId={reviewId}
            refetch={refetch}
            comment={comment}
          />
        </div>
      ))}

      <PageReviewCommentForm reviewId={reviewId} refetch={refetch} />
    </>
  );
}

export default ReviewCommentList;
