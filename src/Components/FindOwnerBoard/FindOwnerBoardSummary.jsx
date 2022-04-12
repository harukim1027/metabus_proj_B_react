import { Link } from 'react-router-dom';
import '../../App.css';
import './FindOwnerBoard.css';

function FindOwnerBoardSummary({ findboard }) {
  return (
    <>
      <div className="findownerboard_header h-full">
        <Link to={`/findboard/${findboard.find_board_no}/`}>
          {findboard.board_image && (
            <div className="h-3/5 overflow-hidden">
              <img
                src={findboard.board_image?.[0]?.image}
                alt={findboard.title}
              />
            </div>
          )}
          <div className="px-4">
            <ul>
              <li className="text-gray-700 font-bold text-xs my-1">
                {findboard.title.length > 13
                  ? findboard.title.substring(0, 13) + '...'
                  : findboard.title}
                <span> ({findboard.comments.length})</span>
              </li>
              <li className="text-gray-700 text-xs">
                발견장소:
                {findboard.find_location.length > 8
                  ? findboard.find_location.substring(0, 8) + '...'
                  : findboard.find_location}
              </li>
              <li className="text-gray-700 text-xs">
                <span className="font-thin"> 품종 : </span>

                {findboard.animal_type === '개'
                  ? findboard.dog_breed
                  : findboard.cat_breed}
              </li>
              <li className="text-gray-700 text-xs">
                <span className="font-thin"> 글쓴이 : </span>
                <span className="font-semibold">{findboard.user.nickname}</span>
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </>
  );
}
export default FindOwnerBoardSummary;
