import NewNav from 'Components/Main/NewNav';
import AnimalList from 'Components/StreetAnimal/AnimalList';
import { useNavigate } from 'react-router-dom';

function PageAnimalList() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <NewNav />
        <AnimalList />
      </div>
      <div className="text-center mt-5">
        <button
          className="font-bold text-xl mb-10"
          onClick={() => navigate(`/admin/main/`)}
        >
          관리자 화면으로
        </button>
      </div>
    </>
  );
}

export default PageAnimalList;
