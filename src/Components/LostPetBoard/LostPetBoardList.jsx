import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';

function LostPetBoardList() {
  const { auth } = useAuth();

  // get요청
  const [{ data: lostPetList, loading, error }, refetch] = useApiAxios(
    {
      url: `/lost_pet_board/api/posts/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <button>검색</button>

      {auth.isLoggedIn && (
        <button>
          <img src="/pen2.png" alt="button"></img>
        </button>
      )}
    </>
  );
}

export default LostPetBoardList;
