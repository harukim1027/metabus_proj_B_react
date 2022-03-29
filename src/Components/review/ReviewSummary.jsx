import { Link } from 'react-router-dom';
import 'react-awesome-slider/dist/styles.css';
import './SlideStyle.css';

function ReviewSummary({ review }) {
  console.log('review:', review);

  const pickImage = review.review_image.slice(0, 4);
  const imagePart1 = pickImage.slice(0, 2);
  const imagePart2 = pickImage.slice(2, 4);

  console.log('imagePart2', imagePart2);

  return (
    <>
      <div>
        <Link to={`/review/${review.review_no}/`}>
          <div class="absolute inset-1">
            <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 flex z-0 justify-center items-center text-2xl text-white font-semibold">
              <h2 className="image__description">
                {review.title.length > 15
                  ? review.title.substring(0, 15) + '...'
                  : review.title}
              </h2>
            </div>
          </div>
          {/* <div class="absolute inset-0">
            <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-1 flex z-1 justify-center items-center text-md text-white">
              <h2 className="image__description text-center">
                {review.content.length > 15
                  ? review.content.substring(0, 15) + '...'
                  : review.content}
              </h2>
            </div>
          </div> */}
          <div className="ItemWrapper">
            {imagePart1?.map((img) => (
              <img
                className="max-w-full max-h-full rounded hover:"
                src={img.image}
                alt={img.review_image_no}
                width={250}
                height={250}
              />
            ))}
          </div>
          <div className="ItemWrapper">
            {imagePart2?.map((img) => (
              <img
                className="rounded"
                src={img.image}
                alt={img.review_image_no}
                width={250}
                height={250}
              />
            ))}
          </div>
        </Link>
      </div>
    </>
  );
}
export default ReviewSummary;
