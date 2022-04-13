import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReviewCommentDetail from './ReviewCommentDetail';
import ReviewCommentForm from './ReviewCommentForm';
import 'css/Comment.css';
import TimeAgo from './TimeAgo';

function ReviewCommentList({ reviewId }) {
  const [{ data: review, loading, error }, refetch] = useApiAxios(
    `/adopt_review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {review?.comments.map((comment, index) => (
        <div className="comment-main col-6" key={index}>
          <ol className="tweet-list">
            <li className="tweet-card">
              <div className="tweet-content">
                <div className="tweet-header">
                  <span className="fullname">
                    <strong>{comment.user}</strong>
                  </span>
                  <span className="tweet-time">
                    {' '}
                    - <TimeAgo comment={comment.updated_at} />{' '}
                    <ReviewCommentDetail
                      comment={comment}
                      reviewId={reviewId}
                      refetch={refetch}
                    />
                  </span>
                </div>
                <div>
                  <img
                    className="tweet-card-avatar"
                    src="/logo.jpg"
                    alt="logo"
                  />
                </div>
                <div className="tweet-text">
                  <p data-aria-label-part="0">
                    <br />
                    {comment.comment_content}

                    <br />
                  </p>
                </div>
              </div>
            </li>
          </ol>
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
