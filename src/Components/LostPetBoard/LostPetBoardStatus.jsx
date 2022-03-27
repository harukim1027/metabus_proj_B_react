import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import useFieldValues from 'hooks/useFieldValues';
import LoadingIndicator from 'LoadingIndicator';

const INIT_VALUES = {
  status: '',
};

function LostPetBoardStatus({ lostpetboardId, handleDidSave, lostpetboard }) {
  const { auth } = useAuth();
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUES);

  INIT_VALUES.status = lostpetboard.status;

  // patch 요청
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    patchRequest,
  ] = useApiAxios(
    {
      url: `/lost_pet_board/api/board/${lostpetboardId}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  // 저장
  const handleSubmit = (e) => {
    e.preventDefault();
    patchRequest({
      data: fieldValues,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  //-------------

  return (
    <>
      <div>
        {/* 로딩 에러 */}
        {saveLoading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
        {saveError && (
          <>
            <p className="text-red-400">
              &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
            </p>
          </>
        )}

        <form onSubmit={handleSubmit}>
          <select
            name="status"
            value={fieldValues.status}
            onChange={handleFieldChange}
            className="border-2 border-gray-400 rounded px-5 py-2"
            defaultValue="상태 선택"
          >
            <option value="">상태 선택</option>
            <option value="찾는중">찾는중</option>
            <option value="찾았어요">찾았어요</option>
          </select>

          <button className="bg-gray-300 hover:bg-gray-800 hover:text-white rounded-md p-3 ml-3">
            저장
          </button>
        </form>
      </div>
    </>
  );
}

export default LostPetBoardStatus;
