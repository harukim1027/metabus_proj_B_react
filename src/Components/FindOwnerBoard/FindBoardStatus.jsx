// import { useApiAxios } from 'api/base';
// import { useAuth } from 'contexts/AuthContext';
// import useFieldValues from 'hooks/useFieldValues';
// import LoadingIndicator from 'LoadingIndicator';

// const INIT_VALUES = {
//   status: '',
// };

// function FindBoardStatus({ findboardId, handleDidSave, findboard }) {
//   const { auth } = useAuth();

//   // patch 요청
//   const [
//     {
//       loading: saveLoading,
//       error: saveError,
//       errorMessages: saveErrorMessages,
//     },
//     patchRequest,
//   ] = useApiAxios(
//     {
//       url: `/find_owner_board/api/board/${findboardId}/`,
//       method: 'PATCH',
//       headers: {
//         Authorization: `Bearer ${auth.access}`,
//       },
//     },
//     { manual: true },
//   );

//   // 저장

//   //-------------

//   return (
//     <>
//       <div>
//         {/* 로딩 에러 */}
//         {saveLoading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
//         {saveError && (
//           <>
//             <p className="text-red-400">
//               &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
//             </p>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default FindBoardStatus;
