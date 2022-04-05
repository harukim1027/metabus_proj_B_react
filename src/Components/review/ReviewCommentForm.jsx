import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const INIT_FIELD_VALUES = {};

function ReviewCommentForm({
  refetch,
  commentID,
  reviewId,
  hidden,
  setHidden,
}) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: getdata, loading, error }, commentRefetch] = useApiAxios(
    `/adopt_review/api/comments/${commentID}/`,
    { manual: !commentID },
  );

  console.log('getdata:', getdata);

  // 저장
  const [
    {
      data: findBoard,
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !commentID
        ? `/adopt_review/api/comments/`
        : `/adopt_review/api/comments/${commentID}/`,
      method: !commentID ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  INIT_FIELD_VALUES.user = auth.userID;
  INIT_FIELD_VALUES.review = reviewId;
  // INIT_FIELD_VALUES.comment_content = review?.comments.comment_content;

  const { fieldValues, setFieldValues, handleFieldChange } = useFieldValues(
    getdata || INIT_FIELD_VALUES,
  );

  console.log('fieldValues', fieldValues);
  console.log('commentID', commentID);

  useEffect(() => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
    }));
  }, [setFieldValues]);

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    if (window.confirm('댓글을 정말 수정 할까요?')) {
      saveRequest({
        data: formData,
      }).then(() => {
        commentRefetch()
          .then(() => refetch())
          .then(() => setHidden(!hidden));
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedPost = response.data;

      if (savedPost) refetch();
    });
  };

  const didYouLog = () => {
    if (window.confirm('로그인 하시겠습니까?')) {
      navigate('/accounts/login/');
    }
  };

  return (
    <>
      <div>
        <h1>
          <div className="max-w-lg shadow-md">
            <form className="w-full p-4">
              <div className="mb-2">
                <label form="comment" class="text-lg text-gray-600">
                  댓글 달기
                </label>
                {auth.isLoggedIn ? (
                  <textarea
                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment_content"
                    placeholder="댓글을 입력해주세요."
                    value={fieldValues?.comment_content}
                    onChange={handleFieldChange}
                  ></textarea>
                ) : (
                  <textarea
                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="content"
                    placeholder="댓글을 입력하려면 로그인해주세요."
                    onClick={didYouLog}
                  ></textarea>
                )}
              </div>

              {!commentID ? (
                <button
                  type="submit"
                  className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                  onClick={(e) => handleSubmit(e)}
                >
                  등록
                </button>
              ) : (
                hidden
              )}

              {commentID ? (
                <div>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                    onClick={(e) => handleEdit(e)}
                  >
                    수정
                  </button>

                  <button
                    type="button"
                    name="clear"
                    className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                    onClick={() => {
                      setHidden(!hidden);
                    }}
                  >
                    취소
                  </button>
                </div>
              ) : (
                hidden
              )}
            </form>
          </div>
        </h1>
      </div>
    </>
  );
}
export default ReviewCommentForm;
