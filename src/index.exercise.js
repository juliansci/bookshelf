import '@reach/dialog/styles.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { Dialog } from '@reach/dialog';
import VisuallyHidden from "@reach/visually-hidden";
import { Logo } from 'components/logo';

function LoginForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    onSubmit({
      username: username.value,
      password: password.value
    })
  }

  return <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button>Login</button>
    </form>
  </div>
}

function RegisterForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    onSubmit({
      username: username.value,
      password: password.value
    })
  }

  return <div>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button>Register</button>
    </form>
  </div>
}

function CustomDialog({ show, onClose, children, ...props }) {
  return <Dialog isOpen={show} onDismiss={onClose} {...props}>
    <button className="close-button" onClick={onClose}>
      <VisuallyHidden>Close</VisuallyHidden>
      <span aria-hidden>×</span>
    </button>
    {children}
  </Dialog>
}
function App() {
  const [dialogState, setDialogState] = useState('');
  const showLogin = dialogState === 'login';
  const showRegister = dialogState === 'register';

  const onSubmitLogin = (formData) => {
    console.log('login', formData);
  }

  const onSubmitRegister = (formData) => {
    console.log('register', formData);

  }
  return <div>
    <Logo height="80" width="80" />
    <h1>Bookshelf</h1>
    <div>
      <button onClick={() => setDialogState('login')}>Login</button>
    </div>
    <div>
      <button onClick={() => setDialogState('register')}>Register</button>
    </div>
    <CustomDialog show={showLogin} onClose={() => setDialogState('')} aria-label="login" >
      <LoginForm onSubmit={onSubmitLogin} />
    </CustomDialog>
    <CustomDialog show={showRegister} onClose={() => setDialogState('')} aria-label="register">
      <RegisterForm onSubmit={onSubmitRegister} />
    </CustomDialog>
  </div >;
}

ReactDOM.render(<App />, document.getElementById('root'));
