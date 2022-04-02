import NewNav from 'Components/Main/NewNav';
import AnimalForm from 'Components/StreetAnimal/AnimalForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageAnimalForm() {
  const navigate = useNavigate();

  const { animalId } = useParams();

  return (
    <div>
      <NewNav />
      <AnimalForm
        animalId={animalId}
        handleDidSave={(savedPost) =>
          navigate(`/admin/animal/${savedPost.animal_no}/`)
        }
      />
    </div>
  );
}

export default PageAnimalForm;
