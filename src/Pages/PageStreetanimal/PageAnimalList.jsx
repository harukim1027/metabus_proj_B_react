import NewNav from 'Components/Main/NewNav';
import AnimalList from 'Components/StreetAnimal/AnimalList';

function PageAnimalList() {
  return (
    <>
      <div>
        <NewNav />
        <AnimalList />
      </div>
      <div className="text-center">
        <button
          className="font-bold text-xl mb-5"
          onClick={() => window.history.back()}
        >
          이전으로
        </button>
      </div>
    </>
  );
}

export default PageAnimalList;
