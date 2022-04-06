import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import FindOwnerBoardCommentForm from './FindOwnerBoardCommentForm';
import FindOwnerBoardCommentDetail from './FindOwnerBoardCommentDetail';

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
        <div>
          {comment.comment_content} by.{comment.user}
          <FindOwnerBoardCommentDetail
            comment={comment}
            findboardId={findboardId}
            refetch={refetch}
          />
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
