import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import useFieldValues from 'hooks/useFieldValues';
import { useState, useEffect } from 'react';
import ReviewCommentForm from './ReviewCommentForm';

function ReviewCommentDetail({ comment, reviewId, refetch }) {
  const [delComment, setDelComment] = useState('');
  const [commentID, setCommentID] = useState('');

  const [hidden, setHidden] = useState(true);
  const { auth } = useAuth();

  // 댓글 삭제
  const [{ loading: loa, error: err }, DelRefetch] = useApiAxios(
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
      DelRefetch().then(() => refetch());
    }
  };

  return (
    <>
      {(auth.userID === comment?.user || auth.is_staff) && (
        <button
          onMouseOver={() => setDelComment(comment?.review_comment_no)}
          onClick={() => commentDelete()}
        >
          삭제
        </button>
      )}

      {(auth.userID === comment?.user || auth.is_staff) && (
        <button
          onMouseOver={() => setCommentID(comment?.review_comment_no)}
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          수정
        </button>
      )}
      {!hidden && (
        <ReviewCommentForm
          comment={comment}
          commentID={commentID}
          reviewId={reviewId}
          refetch={refetch}
          hidden={hidden}
          setHidden={setHidden}
        />
      )}
    </>
  );
}
export default ReviewCommentDetail;
