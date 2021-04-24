import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  TextField,
  InputAdornment,
  Grid,
  Button,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ManageUserRequest, UsersCreateUserApiArg } from '../gen/auth.api.generated';
import { useUsersCreateUserMutation, useUsersGetUsersQuery } from '../service/auth.api';

const Administration : React.FC = () => {
  const dtoUser: ManageUserRequest = {
    userName: '',
    name: '',
    firstName: '',
    mailAddress: '',
    status: 'Restricted',
  };
  const [formState, setFormState] = useState(dtoUser);

  const [
    createUser, // This is the mutation trigger
  ] = useUsersCreateUserMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const param: UsersCreateUserApiArg = { manageUserRequest: formState };
      createUser(param);
    } catch (err) {
      console.log(err);
    }
  };

  const { data } = useUsersGetUsersQuery({});
  let users;
  if (data) {
    users = data.map((user) => <li key={user.id}>{user.userName}</li>);
  }

  const useStyles = makeStyles((theme) => ({
    table: {
      marginTop: theme.spacing(3),
      '& tbody td': {
        fontWeight: '300',
      },
      '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointed',
      },
      '& tbody td:nth-child(4)': {
        width: '25%',
      },
    },
    newUserButton: {
      position: 'absolute',
      right: '10px',
    },
  }));

  const classes = useStyles();

  const tableEntries = [
    {
      id: '1',
      userFullName: 'Lukas Schlunegger',
      userShortName: 'lsc',
      userPosition: 'System Engineer',
    },
    {
      id: '2',
      userFullName: 'Armend Lesi',
      userShortName: 'ale',
      userPosition: 'Projektleiter',
    },
  ];

  return (
    <Grid>
      <h1> Administration </h1>
      <h2>Alle Benutzer</h2>
      {users}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          username
          <input id="username" name="username" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          name
          <input id="name" name="name" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="firstName">
          firstName
          <input id="firstName" name="firstName" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="initial">
          initial
          <input id="initial" name="initial" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="mailAddress">
          mailAddress
          <input id="mailAddress" name="mailAddress" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="status">
          status
          <input id="status" name="status" type="text" onChange={handleChange} />
        </label>
        <input type="submit" value="add" />
      </form>

      <Toolbar>
        <TextField
          name="Suche"
          label="Suche"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" color="primary" className={classes.newUserButton}>
          Neuer Mitarbeiter erfassen
        </Button>
      </Toolbar>
      <Table className={classes.table}>
        <TableBody>
          {
            tableEntries.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.userFullName}</TableCell>
                <TableCell>{item.userShortName}</TableCell>
                <TableCell>{item.userPosition}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Grid>

  );
};

export default Administration;
