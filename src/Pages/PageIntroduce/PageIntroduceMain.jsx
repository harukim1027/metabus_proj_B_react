import InfoAnimal from 'Components/introduce/adopt';
import NewNav from 'Components/Main/NewNav';

const {
  default: IntroduceMain,
} = require('Components/introduce/IntroduceMain');

function PageIntroduceMain() {
  return (
    <>
      <NewNav />

      <div>
        <InfoAnimal />
        <IntroduceMain />
      </div>
    </>
  );
}

export default PageIntroduceMain;
