import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginLoginMutation } from '../service/auth.api';
import { LoginLoginApiArg } from '../gen/auth.api.generated';
import { setCredentials, logoutUser } from '../store/user/reducers';
import { FormUser } from '../store/user/types';
import { useAppSelector } from '../hooks';

function Login() {
  const dispatch = useDispatch();
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
      const token = await login(param).unwrap();
      const user = {
        username: formState.loginName,
        password: formState.password,
        token,
        isAuthenticated: true,
      } as FormUser;
      dispatch(setCredentials(user));
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    dispatch(logoutUser());
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
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default Login;
