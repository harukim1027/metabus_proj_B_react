import { useApiAxios } from 'api/base';
import TimeAgo from 'Components/review/TimeAgo';
import { useEffect } from 'react';
import LostPetBoardCommentDetail from './LostPetBoardCommentDetail';
import LostPetBoardCommentForm from './LostPetBoardCommentForm';
import 'css/Comment.css';

function LostPetBoardCommentList({ lostpetboardId }) {
  const [{ data: lostBoardList, loading, error }, refetch] = useApiAxios(
    `/lost_pet_board/api/board/${lostpetboardId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {lostBoardList?.comments?.map((comment) => (
        <div className="comment-main col-6">
          <ol className="tweet-list">
            <li className="tweet-card">
              <div className="tweet-content">
                <div className="tweet-header">
                  <span className="fullname">
                    <strong>{comment.user.nickname}</strong>
                  </span>
                  <span className="tweet-time">
                    {' '}
                    - <TimeAgo comment={comment.updated_at} />{' '}
                    <LostPetBoardCommentDetail
                      comment={comment}
                      lostBoardList={lostBoardList}
                      lostpetboardId={lostpetboardId}
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
      <LostPetBoardCommentForm
        refetch={refetch}
        lostBoardList={lostBoardList}
        lostpetboardId={lostpetboardId}
      />
    </>
  );
}

export default LostPetBoardCommentList;
