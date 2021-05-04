import React, { useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import {
  Grid, Paper, TextField, FormControlLabel, Checkbox, Button, CircularProgress, Box,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useLoginLoginMutation } from '../service/auth.api';
import { LoginLoginApiArg, LoginResponse } from '../gen/auth.api.generated';
import { setCredentials } from '../store/authInfo/reducers';
import { AuthInfo } from '../store/authInfo/types';
import { useAppDispatch } from '../hooks';
import logo from '../assets/exRap-logo.svg';

const Login : React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    userName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [
    login,
    { error },
  ] = useLoginLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    setLoading(true);
    event.preventDefault();
    try {
      const param: LoginLoginApiArg = { loginRequest: formState };
      try {
        const response : LoginResponse = await login(param).unwrap();
        const authInfo: AuthInfo = {
          username: formState.userName,
          token: response.token,
          isAuthenticated: true,
        };
        dispatch(setCredentials(authInfo));
        sessionStorage.setItem('token', response.token);
        history.push('/');
      } catch (e) {
        console.error('Login failed');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const paperStyle = {
    padding: 50,
    height: 'auto',
    width: 280,
    margin: '200px auto',
  };

  let content = (
    <>
      {error && <Box mb={2}><Alert severity="error">Login fehlgeschlagen! Bitte überprüfen sie Ihre Eingaben.</Alert></Box>}
      <TextField value={formState.userName} id="loginName" name="userName" label="Username" type="text" fullWidth variant="standard" required onChange={handleChange} />
      <TextField id="password" name="password" label="Password" type="password" fullWidth variant="standard" required onChange={handleChange} />
      <FormControlLabel
        control={(
          <Checkbox
            name="checkedB"
            color="primary"
          />
              )}
        label="Stay logged in"
      />
    </>
  );

  if (loading) {
    content = <CircularProgress />;
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Paper elevation={10} style={paperStyle}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >

          <Box className="login-form-logo-container" my={2}>
            <img src={logo} alt="Logo exRap" className="logo" />
          </Box>
          <Box my={2}>
            {content}
          </Box>
          <Box my={2} width="100%">
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Login
            </Button>
          </Box>
        </Grid>
      </Paper>
    </form>
  );
};

export default Login;
