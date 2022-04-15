import NewNav from 'Components/Main/NewNav';

import AnimalDetail from 'Components/StreetAnimal/AnimalDetail';
import { useParams } from 'react-router-dom';

function PageAnimalDetail() {
  const { animalId } = useParams();

  return (
    <>
      <div>
        <NewNav />
        <AnimalDetail animalId={animalId} />
      </div>
      <div className="text-center mt-5">
        <button
          className="font-bold text-xl mb-10"
          onClick={() => window.history.back()}
        >
          이전으로
        </button>
      </div>
    </>
  );
}

export default PageAnimalDetail;
