import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import PageReviewCommentForm from 'Pages/PageReview/PageReviewCommentForm';
import { useState } from 'react';
import ReviewCommentForm from './ReviewCommentForm';

function ReviewCommentDetail(reviewId, comment) {
  const [delComment, setDelComment] = useState('');
  const [setCommentId, setSetCommentId] = useState('');

  const [hidden, setHidden] = useState(true);
  const { auth } = useAuth();

  // 댓글 삭제
  const [{ loading: loa, error: err }, delCommentRefetch] = useApiAxios(
    {
      url: `/adopt_review/api/comments/${delComment}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const commentDelete = () => {
    if (window.confirm('댓글을 정말 삭제 할까요?')) {
      delCommentRefetch()
        .then(() => {
          reviewId.refetch();
        })
        .then(() => setHidden(!hidden));
    }
  };

  //   console.log('reviewId:', reviewId);
  //   console.log('comment:', comment);
  //   console.log('setCommentId:', setCommentId);

  return (
    <>
      <button
        onMouseOver={() => setDelComment(reviewId?.comment?.review_comment_no)}
        onClick={() => commentDelete()}
      >
        삭제
      </button>
      <button
        onMouseOver={() =>
          setSetCommentId(reviewId?.comment?.review_comment_no)
        }
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        수정
      </button>

      {!hidden && (
        <ReviewCommentForm
          reviewId={reviewId}
          refetch={reviewId?.refetch}
          editCommentId={reviewId?.comment?.review_comment_no}
        />
      )}
    </>
  );
}
export default ReviewCommentDetail;
