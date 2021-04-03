import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { logoutUser } from '../store/user/reducers';

function Signout() {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  return (
    <div>
      <h1>Signout</h1>
      <Button component={Link} to="/login">Wieder einloggen</Button>
    </div>
  );
}

export default Signout;
