import { useState } from 'react';
import { createSession } from '../js/services';
import errors from '../js/errors';

const Login = function({ onLogin }) {

  const [username, setUsername] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    setUsername(e.target.value);
    setIsDisabled(!e.target.value);
  };

  const login = () => {
    setIsPending(true);
    createSession({ username })
    .then( userinfo => {
      setError('');
      setIsPending(false);
      onLogin({ username });
    })
    .catch( err => {
      setError(errors[err.error || err || "DEFAULT"]);
      setIsPending(false);
    });
  };

  return (
    <div className="login-option">
      { error && <div className="status">{error}</div>}
      <p className="login-header">Login Here</p>
      <div className="login-form">
      <label className="login-username">
        Username
        </label>
        <input className="login-input"disabled={isPending} onChange={onChange} value={username} />
      
      <button className="login-button" onClick={login} disabled={isDisabled || isPending} >{ isPending ? "..." : "Login"}</button>
      </div>
      
    </div>
  );
};
export default Login;
