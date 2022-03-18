import { Link } from 'react-router-dom';
import '../../App.css';
import './FindOwnerBoard.css';

function FindOwnerBoardSummary({ findboard }) {
  return (
    <>
      <div className="review_header h-full">
        <Link to={`/review/${findboard.find_board_no}/`}>
          {findboard.image1 && (
            <div className="h-2/3 overflow-hidden">
              <img src={findboard.image} alt={findboard.title} />
            </div>
          )}
          <div className="px-6 py-4">
            <h2 className="font-bold text-base mb-2">
              {findboard.title.length > 7
                ? findboard.title.substring(0, 7) + '...'
                : findboard.title}
            </h2>
            <h3 className="text-gray-700 text-base">
              by: {findboard.user.nickname}
            </h3>
          </div>
        </Link>
      </div>
    </>
  );
}
export default FindOwnerBoardSummary;
