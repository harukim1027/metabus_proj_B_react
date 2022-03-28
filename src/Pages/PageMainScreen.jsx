import MainScreen from 'Components/Main/MainScreen';
import NewNav from 'Components/Main/NewNav';

function PageMainScreen() {
  return (
    <>
      <NewNav />
      <div>
        <MainScreen />
      </div>
    </>
  );
}

export default PageMainScreen;
