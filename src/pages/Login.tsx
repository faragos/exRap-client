import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginLoginMutation } from '../service/auth.api';
import { LoginLoginApiArg } from '../gen/auth.api.generated';
import { setCredentials } from '../store/user/reducers';
import { User } from '../store/user/types';
import { useAppDispatch, useAppSelector } from '../hooks';

function Login() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);
  const [formState, setFormState] = useState({
    loginName: '',
    password: '',
  });
  const [
    login, // This is the mutation trigger
  ] = useLoginLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const param = { exRapAuthDtoCredential: formState } as LoginLoginApiArg;
      const response :any = await login(param).unwrap(); // TODO: use right type after API is ready
      const user: User = {
        username: formState.loginName,
        token: response.token,
        isAuthenticated: true,
      };
      dispatch(setCredentials(user));
      sessionStorage.setItem('token', response.token);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>login</h1>
      <p>
        Hallo
        {' '}
        { currentUser.username }
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="loginName">
          username
          <input id="loginName" name="loginName" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="password">
          password
          <input id="password" name="password" type="password" onChange={handleChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
export default Login;
