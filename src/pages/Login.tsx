import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid, Paper, TextField, FormControlLabel, Checkbox, Button,
} from '@material-ui/core';
import { useLoginLoginMutation } from '../service/auth.api';
import { LoginLoginApiArg } from '../gen/auth.api.generated';
import { setCredentials, logoutUser } from '../store/user/reducers';
import { User } from '../store/user/types';
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
      const response :any = await login(param).unwrap(); // TODO: use right type after API is ready
      const user = {
        username: formState.loginName,
        password: formState.password,
        token: response.token,
        isAuthenticated: true,
      } as User;
      dispatch(setCredentials(user));
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const paperStyle = {
    padding: 20,
    height: '50vh',
    width: 280,
    margin: '200px auto',
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <p>
          Hallo
          {' '}
          { currentUser.username }
        </p>
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h1> ExRap </h1>
          </Grid>
          <TextField id="loginName" name="loginName" label="Username" type="text" fullWidth required onChange={handleChange} />
          <TextField id="password" name="password" label="Password" type="password" fullWidth required onChange={handleChange} />
          <FormControlLabel
            control={(
              <Checkbox
                name="checkedB"
                color="primary"
              />
                )}
            label="Stay logged in"
          />
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Login
          </Button>
          <p />
          <Button type="button" color="primary" variant="contained" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Paper>
      </Grid>
    </form>
  );
}
export default Login;
