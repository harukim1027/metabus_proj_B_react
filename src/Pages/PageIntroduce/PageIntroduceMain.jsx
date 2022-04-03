import NewNav from 'Components/Main/NewNav';

const {
  default: IntroduceMain,
} = require('Components/introduce/IntroduceMain');

function PageIntroduceMain() {
  return (
    <>
      <NewNav />

      <div>
        <IntroduceMain />
      </div>
    </>
  );
}

export default PageIntroduceMain;
