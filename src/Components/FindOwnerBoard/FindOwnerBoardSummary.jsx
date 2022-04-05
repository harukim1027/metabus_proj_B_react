import { Link } from 'react-router-dom';
import '../../App.css';
import './FindOwnerBoard.css';

function FindOwnerBoardSummary({ findboard }) {
  return (
    <>
      <div className="findownerboard_header h-full">
        <Link to={`/findboard/${findboard.find_board_no}/`}>
          {findboard.board_image && (
            <div className="h-2/3 overflow-hidden">
              <img
                src={findboard.board_image?.[0]?.image}
                alt={findboard.title}
              />
            </div>
          )}
          <div className="px-6 py-4">
            <ul>
              <li className="text-gray-700 text-xs">
                발견장소: {findboard.find_location}
              </li>
              <li className="text-gray-700 text-xs">
                동물종류: {findboard.animal_type},
                {findboard.animal_type === '개'
                  ? findboard.dog_breed
                  : findboard.cat_breed}
              </li>
              <li className="text-gray-700 text-xs">
                작성자: {findboard.user.userID}
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </>
  );
}
export default FindOwnerBoardSummary;
