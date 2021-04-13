import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid, Paper, TextField, FormControlLabel, Checkbox, Button,
} from '@material-ui/core';
import { useLoginLoginMutation } from '../service/auth.api';
import { LoginLoginApiArg } from '../gen/auth.api.generated';
import { setCredentials } from '../store/user/reducers';
import { User } from '../store/user/types';
import { useAppDispatch } from '../hooks';

const Login : React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
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
      const param: LoginLoginApiArg = { exRapAuthDtoCredential: formState };
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

  const paperStyle = {
    padding: 20,
    height: '50vh',
    width: 280,
    margin: '200px auto',
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
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
        </Paper>
      </Grid>
    </form>
  );
};
export default Login;
