import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from 'Components/review/ReviewForm';
import { useApiAxios } from 'api/base';
import NewNav from 'Components/Main/NewNav';

function PageReviewForm() {
  const navigate = useNavigate();

  const { reviewId } = useParams();

  const [
    { data: review, loading: getLoading, error: getError },
    refetchReview,
  ] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'GET',
    },
    {
      manual: !reviewId,
    },
  );

  return (
    <>
      <NewNav />
      <ReviewForm
        review={review}
        reviewId={reviewId}
        refetchReview={refetchReview}
        handleDidSave={(savedPost) =>
          navigate(`/review/${savedPost.review_no}/`)
        }
      />
    </>
  );
}
export default PageReviewForm;
