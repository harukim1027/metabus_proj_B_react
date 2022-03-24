import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  // comment_content: '',
  // review: '',
};

function ReviewCommentForm({
  reviewCommentId,
  reviewId,
  refetch,
  editCommentId,
}) {
  const { auth } = useAuth();
  const [hidden, setHidden] = useState(true);
  const [{ data: commentsData }] = useApiAxios(
    {
      url: `/adopt_review/api/comments/${reviewCommentId}/`,
    },

    { manual: !reviewCommentId },
  );

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
      url: !editCommentId
        ? `/adopt_review/api/comments/`
        : `/adopt_review/api/comments/${editCommentId}/`,
      method: !editCommentId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  INIT_FIELD_VALUES.user = auth.userID;
  INIT_FIELD_VALUES.review = reviewId;
  INIT_FIELD_VALUES.comment_content = reviewId.comment?.comment_content;

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    commentsData || INIT_FIELD_VALUES,
  );
  console.log('reviewId', reviewId);
  useEffect(() => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
    }));
  }, [commentsData, setFieldValues]);

  const handleSubmit = (e) => {
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
    saveRequest({
      data: formData,
    })
      .then(() => {
        setHidden(!hidden);
      })
      .then(() => {
        refetch();
      });
  };

  return (
    <>
      {hidden && (
        <div>
          <h1>
            <div className="max-w-lg shadow-md">
              <form className="w-full p-4">
                <div className="mb-2">
                  <label form="comment" class="text-lg text-gray-600">
                    댓글 달기
                  </label>
                  <textarea
                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment_content"
                    placeholder="댓글을 입력해주세요"
                    value={fieldValues?.comment_content}
                    onChange={handleFieldChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                  onClick={(e) => handleSubmit(e)}
                >
                  등록
                </button>

                <button
                  type="button"
                  name="clear"
                  className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                  onClick={() => setHidden(!hidden)}
                >
                  취소
                </button>
              </form>
            </div>
          </h1>
        </div>
      )}
    </>
  );
}

export default ReviewCommentForm;
