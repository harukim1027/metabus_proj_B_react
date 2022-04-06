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
      <FindOwnerBoardCommentForm
        refetch={refetch}
        findBoardList={findBoardList}
        findboardId={findboardId}
      />

      {findBoardList?.comments.map((comment) => (
        <>
          <div className="">
            <h1 className="user_name">{comment.user}</h1>
            <h2>{comment.comment_content} </h2>
            <FindOwnerBoardCommentDetail
              comment={comment}
              findboardId={findboardId}
              refetch={refetch}
            />
          </div>
        </>
      ))}
    </>
  );
}

export default FindOwnerBoardCommentList;
