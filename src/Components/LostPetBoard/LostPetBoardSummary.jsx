import { Link } from 'react-router-dom';
import '../../App.css';
import './LostPetBoard.css';

function LostPetBoardSummary({ lostpetboard }) {
  return (
    <>
      <div className="lostpetboard_header h-full">
        <Link to={`/lostpetboard/${lostpetboard.lost_board_no}/`}>
          {lostpetboard.board_image && (
            <div className="h-3/5 overflow-hidden">
              <img
                src={lostpetboard.board_image?.[0]?.image}
                alt={lostpetboard.title}
              />
            </div>
          )}

          <div className="px-4">
            <ul>
              <li className="text-gray-700 font-bold text-xs my-1">
                {lostpetboard.title.length > 13
                  ? lostpetboard.title.substring(0, 13) + '...'
                  : lostpetboard.title}
                <span> ({lostpetboard.comments.length})</span>
              </li>
              <li className="text-gray-700 text-xs">
                유실장소:
                {lostpetboard.lost_location.length > 8
                  ? lostpetboard.lost_location.substring(0, 8) + '...'
                  : lostpetboard.lost_location}
              </li>
              <li className="text-gray-700 text-xs">
                동물종류:{lostpetboard.animal_type} &gt;
                {lostpetboard.animal_type === '개'
                  ? lostpetboard.dog_breed
                  : lostpetboard.cat_breed}
              </li>

              <div className="text-left text-xs mb-5 my-2">
                <span className="font-thin"> 글쓴이 : </span>
                <span className="font-semibold">
                  {lostpetboard.user.nickname}
                </span>
              </div>
            </ul>
          </div>
        </Link>
      </div>
    </>
  );
}

export default LostPetBoardSummary;
