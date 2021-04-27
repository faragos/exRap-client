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
import {
  UserOverview, UsersGetUsersApiArg,
} from '../gen/auth.api.generated';
import { useUsersGetUsersQuery } from '../service/auth.api';
import AddNewUserModal from '../components/modals/AddNewUserModal';

const Administration : React.FC = () => {
  const dtoUser: UserOverview = {
    userName: '',
    name: '',
    firstName: '',
    mailAddress: '',
    status: 'Restricted',
  };

  const [currentUser, setCurrentUser] = useState(dtoUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usersArg: UsersGetUsersApiArg = {};
  const { data: users = [] } = useUsersGetUsersQuery(usersArg);

  const addNewUserHandler = () => {
    setCurrentUser(dtoUser);
    setIsModalOpen(true);
  };

  const editUser = (user: UserOverview) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

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
  return (
    <div>
      <Grid>
        <h1> Administration </h1>

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
          <Button variant="contained" color="primary" className={classes.newUserButton} onClick={addNewUserHandler}>
            Neuer Mitarbeiter erfassen
          </Button>
        </Toolbar>
        <Table className={classes.table}>
          <TableBody>
            {
              users.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.firstName}
                    {' '}
                    {item.name}
                  </TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>item.roles</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editUser(item)}>
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
      <AddNewUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        user={currentUser}
      />
    </div>
  );
};
export default Administration;
