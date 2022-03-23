import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import PageReviewCommentForm from 'Pages/PageReview/PageReviewCommentForm';

function ReviewCommentList({ reviewId }) {
  const { auth } = useAuth();
  const [delComment, setDelComment] = useState('');

  // 댓글 리스트
  const [{ data: review, loading, error }, refetch] = useApiAxios(
    `/adopt_review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

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
      delCommentRefetch().then(() => {
        refetch();
      });
    }
  };

  // 댓글 수정

  return (
    <>
      {review?.comments.map((comment) => (
        <div>
          {comment.comment_content} by.{comment.user}
          <button
            onMouseOver={() => setDelComment(comment.review_comment_no)}
            onClick={() => commentDelete()}
          >
            삭제
          </button>
          <button
            onClick={() => {
              //   navigate(`/review/comments/${comment.review_comment_no}/`);
            }}
          >
            수정
          </button>
          {/* {changeCom &&
            changeCom.map((a) => (
              <button
                onClick={() => {
                  setChangeCom();
                }}
              >
                {' '}
                수정임
              </button>
            ))} */}
        </div>
      ))}

      <PageReviewCommentForm reviewId={reviewId} refetch={refetch} />
    </>
  );
}

export default ReviewCommentList;
