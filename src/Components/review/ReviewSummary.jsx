import { Link } from 'react-router-dom';
import 'react-awesome-slider/dist/styles.css';
// import './style.css';

function ReviewSummary({ review }) {
  // const slider = (
  //   <AwesomeSlider cssModule={AwesomeSliderStyles}>
  //     {review.review_image?.map((review) => (
  //       <div data-src={review.image} alt={review.title} />
  //     ))}
  //   </AwesomeSlider>
  // );

  console.log(review);

  return (
    <>
      <div>
        <Link to={`/review/${review.review_no}/`}>
          {/* {review.image1 && (
            <div className="h-2/3 overflow-hidden">
              <img src={review.image1} alt={review.title} />
            </div>
          )} */}
          <div>
            <h2 className="text-white text-center ItemWrapper">
              {review.title.length > 7
                ? review.title.substring(0, 7) + '...'
                : review.title}
            </h2>
            <h3 className="text-white text-center ">
              by: {review.user.nickname}
            </h3>
          </div>

          <div className="image__description">
            {review.review_image?.map((review) => (
              <div className="image__description">
                <img src={review.image} alt={review.title} />
                {review.title}
              </div>
            ))}
          </div>
        </Link>
      </div>
    </>
  );
}
export default ReviewSummary;
