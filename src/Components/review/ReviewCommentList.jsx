import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReviewCommentDetail from './ReviewCommentDetail';
import ReviewCommentForm from './ReviewCommentForm';
import 'css/pagination_review.css';
import TimeAgo from './TimeAgo';

function ReviewCommentList({ review, refetch, reviewId }) {
  return (
    <>
      {review?.comments.map((comment) => (
        <div className="comment-main col-6">
          <ol class="tweet-list">
            <li class="tweet-card">
              <div class="tweet-content">
                <div class="tweet-header">
                  <span class="fullname">
                    <strong>{comment.user.nickname}</strong>
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
