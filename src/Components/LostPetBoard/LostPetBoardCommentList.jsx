import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import LostPetBoardCommentDetail from './LostPetBoardCommentDetail';
import LostPetBoardCommentForm from './LostPetBoardCommentForm';

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
      <LostPetBoardCommentForm
        refetch={refetch}
        lostBoardList={lostBoardList}
        lostpetboardId={lostpetboardId}
      />

      {lostBoardList?.comments?.map((comment) => (
        <>
          <div className="">
            <h1 className="user_name">{comment.user}</h1>
            <h2>{comment.comment_content} </h2>
            <LostPetBoardCommentDetail
              comment={comment}
              lostBoardList={lostBoardList}
              lostpetboardId={lostpetboardId}
              refetch={refetch}
            />
          </div>
        </>
      ))}
    </>
  );
}

export default LostPetBoardCommentList;
