import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import { React } from 'react';
import { useState } from 'react/cjs/react.production.min';
import produce from 'immer';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  comment_content: '',
  // review: '',
};

function ReviewCommentForm({ reviewCommentId, reviewId, refetch }) {
  //   const [input, setInput] = useState();
  //   const [comments, setComments] = useState(INITIAL_STATE);\
  const navigate = useNavigate();

  const { auth } = useAuth();
  const [{ data: commentsData }, refetchComment] = useApiAxios(
    {
      url: `/adopt_review/api/comments/${reviewCommentId}/`,
    },

    { manual: !reviewCommentId },
  );

  // const [selectReviewId, setSelectReviewId] = useState(comments?.review_id);

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
      url: !reviewCommentId
        ? `/adopt_review/api/comments/`
        : `/adopt_review/api/comments/${reviewCommentId}/`,
      method: !reviewCommentId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  INIT_FIELD_VALUES.user = auth.userID;
  INIT_FIELD_VALUES.review = reviewId;

  const { fieldValues, handleFieldChange, setFieldValues, clearFieldValues } =
    useFieldValues(commentsData || INIT_FIELD_VALUES);

  useEffect(() => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
    }));
  }, [commentsData]);

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
    }).then(() => {
      refetch().then(() => clearFieldValues());
    });
  };

  console.log('commentsData', commentsData);

  return (
    <>
      <div>
        <h1>
          <div class="max-w-lg shadow-md">
            <form action="" class="w-full p-4">
              <div class="mb-2">
                <label for="comment" class="text-lg text-gray-600">
                  댓글 달기
                </label>
                <textarea
                  class="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                  name="comment_content"
                  placeholder="댓글을 입력해 주세요"
                  value={fieldValues?.comments?.map(
                    (comment) => comment.comment_content,
                  )}
                  onChange={handleFieldChange}
                ></textarea>
              </div>
              <button
                type="submit"
                class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                onClick={(e) => handleSubmit(e)}
              >
                등록
              </button>
            </form>
          </div>
        </h1>
      </div>
    </>
  );
}

export default ReviewCommentForm;
