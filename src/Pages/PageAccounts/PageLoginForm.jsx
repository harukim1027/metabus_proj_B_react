// import Account from 'Components/accounts/Account';
import LoginForm from 'Components/accounts/LoginForm';
import NewNav from 'Components/Main/NewNav';

import { ToastContainer, toast } from 'react-toastify';

function PageLoginForm() {
  return (
    <div>
      <NewNav />
      <ToastContainer />
      <LoginForm />
    </div>
  );
}

export default PageLoginForm;
