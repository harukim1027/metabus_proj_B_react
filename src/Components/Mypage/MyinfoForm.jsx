import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import Sidebar from 'Components/Mypage/Sidebar';
import LoadingIndicator from 'LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import produce from 'immer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// 초깃값 저장을 위한 오브젝트
const INIT_FIELD_VALUES = {
  name: '',
  userID: '',
  last_login: '',
  nickname: '',
  email: '',
  phone_number: '',
  region: '',
  password_quiz: '',
  password_quiz_answer: '',
};

function MyinfoForm({ handleDidSave }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 마지막 로그인 시간을 위한 시간 생성

  //데이터 GET요청 : 조회 목적
  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.userID}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);
  // console.log(userData);

  // 데이터 PATCH 요청 : 수정목적
  // 저장
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !auth.userID
        ? `/accounts/api/users/`
        : `/accounts/api/users/${auth.userID}/`,
      method: !auth.userID ? 'POST' : 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    userData || INIT_FIELD_VALUES,
  );

  // 개인정보는 수정할 수도 있고 안 할 수도 있기 때문에 초안을 둬야한다.
  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.name = auth.name;
        draft.userID = auth.userID;
        draft.last_login = '';
        draft.nickname = auth.nickname;
        draft.email = auth.email;
        draft.phone_number = auth.phone_number;
        draft.region = auth.region;
        draft.password_quiz = auth.password_quiz;
        draft.password_quiz_answer = auth.password_quiz_answer;

        draft.user = auth.userID;
      }),
    );
  }, [userData]);
  // 저장
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
      } else {
        formData.append(name, value);
      }
    });

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });

    if (window.confirm('수정 하시겠습니까?')) {
      // 인증 후, 이동할 주소를 지정합니다.
      navigate('/accounts/login/');
      toast.success('수정 완료! 다시 로그인해주세요!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // 처음 화면 로딩시 최상단으로 로딩
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 mypage_header rounded-xl overflow-hidden sm:px-20 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="xs:mt-2 md:mt-5 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-3 font-semibold italic text-center text-slate-900">
            <span className="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block">
              <span className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl relative text-white">
                " 내 회원정보 수정"
              </span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다. 정보가 없습니다.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="border mb-5 overflow-hidden">
              <div className=" min-w-full divide-y divide-gray-200">
                {/* 이름 입력 input 박스 */}
                <table className="text-left ">
                  <tr>
                    <th className="p-3 xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-gray-100 bg-gray-200 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={fieldValues.name}
                        onChange={handleFieldChange}
                        placeholder={userData?.name}
                        className="ml-3 text-left rounded-md text-lg  bg-gray-100 focus:bg-white focus:border-gray-400 w-3/4 p-2 "
                      />
                      {saveErrorMessages.title?.map((message, index) => (
                        <p key={index} className="text-base text-red-400">
                          변경하실 이름을 입력해주세요.
                        </p>
                      ))}
                    </td>
                  </tr>

                  <tr>
                    <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      아이디
                    </th>
                    <td className="">&nbsp;&nbsp;&nbsp;{userData?.userID}</td>
                  </tr>

                  <tr>
                    <th className=" xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      닉네임
                    </th>
                    <td className="">&nbsp;&nbsp;&nbsp;{userData?.nickname}</td>
                  </tr>

                  <tr>
                    <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      이메일
                    </th>
                    <td className="mx-5">
                      &nbsp;&nbsp;&nbsp;{userData?.email}
                    </td>
                  </tr>
                  <tr>
                    <th className=" xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-200 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      연락처
                    </th>
                    <td>
                      <input
                        type="text"
                        name="phone_number"
                        value={fieldValues.phone_number}
                        onChange={handleFieldChange}
                        placeholder={userData?.phone_number}
                        className="ml-3 text-left rounded-md text-lg  bg-gray-100 focus:bg-white focus:border-gray-400 w-3/4 p-2"
                      />
                      {saveErrorMessages.title?.map((message, index) => (
                        <p key={index} className="text-base text-red-400">
                          변경하실 연락처를 입력해주세요.
                        </p>
                      ))}
                    </td>
                  </tr>

                  <tr>
                    <th className=" xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-200 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      거주지
                    </th>
                    <td>
                      <input
                        type="text"
                        name="region"
                        value={fieldValues.region}
                        onChange={handleFieldChange}
                        placeholder={userData?.region}
                        className="ml-3 text-left rounded-md text-lg  bg-gray-100 focus:bg-white focus:border-gray-400 w-3/4 p-2"
                      />
                      {saveErrorMessages.title?.map((message, index) => (
                        <p key={index} className="text-base text-red-400">
                          변경하실 주소를 입력해주세요.
                        </p>
                      ))}
                    </td>
                  </tr>

                  <tr>
                    <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      비밀번호 퀴즈
                    </th>
                    <td className="ml-5 mr-5 ">
                      &nbsp;&nbsp;&nbsp;{userData?.password_quiz}
                    </td>
                  </tr>
                  <tr>
                    <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                      퀴즈 정답
                    </th>
                    <td className="ml-5 mr-5 ">
                      &nbsp;&nbsp;&nbsp;{userData?.password_quiz_answer}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="text-right mr-5">
              <a
                href="/mypage/userinfo/"
                className="shadow-md bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-lg border-4 font-bold text-white py-1 px-2 rounded"
                onClick={(e) => handleSubmit(e)}
              >
                저장
              </a>
              <a
                href="/mypage/userinfo/"
                className="shadow-md ml-3 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 font-bold text-lg border-4 text-white py-1 px-2 rounded"
              >
                취소
              </a>
              <div className="p-5">
                {saveLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
                {saveError && (
                  <>
                    <p className="text-red-400">
                      `저장 중 에러가 발생했습니다. 메세지를 확인해주세요.`
                    </p>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyinfoForm;
