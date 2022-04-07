import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import FindOwnerBoardCommentForm from './FindOwnerBoardCommentForm';
import FindOwnerBoardCommentDetail from './FindOwnerBoardCommentDetail';
import 'css/Comment.css';
import TimeAgo from 'Components/review/TimeAgo';

function FindOwnerBoardCommentList({ findboardId }) {
  const [{ data: findBoardList, loading, error }, refetch] = useApiAxios(
    `/find_owner_board/api/board/${findboardId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {findBoardList?.comments.map((comment) => (
        <div className="comment-main col-6">
          <ol class="tweet-list">
            <li class="tweet-card">
              <div class="tweet-content">
                <div class="tweet-header">
                  <span class="fullname">
                    <strong>{comment.user}</strong>
                  </span>
                  <span class="tweet-time">
                    {' '}
                    - <TimeAgo comment={comment.updated_at} />{' '}
                    <FindOwnerBoardCommentDetail
                      comment={comment}
                      findboardId={findboardId}
                      refetch={refetch}
                    />
                  </span>
                </div>
                <div>
                  <img class="tweet-card-avatar" src="/logo.jpg" alt="logo" />
                </div>
                <div class="tweet-text">
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
      <FindOwnerBoardCommentForm
        refetch={refetch}
        findBoardList={findBoardList}
        findboardId={findboardId}
      />
    </>
  );
}

export default FindOwnerBoardCommentList;
