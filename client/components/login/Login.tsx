import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginAttributes } from '../../store/authentication/interface';
import { logIn } from '../../store/authentication/actions';
import './loginForm.scss';

const Login: React.FC = () => {
  const [fields, setFields] = useState<LoginAttributes>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const fieldsInputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const loginUser = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(logIn(fields.email, fields.password));
  };

  return (
    <form onSubmit={(event) => loginUser(event)} className="login-form">
      <label htmlFor="email">
        E-mail
        <input
          name="email"
          type="text"
          onChange={fieldsInputHandler}
          value={fields.email}
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          name="password"
          type="password"
          onChange={fieldsInputHandler}
          value={fields.password}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
