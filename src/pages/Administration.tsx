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
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {
  UserOverview,
  UsersGetUsersApiArg,
  UsersUpdateUserApiArg,
  useUsersUpdateUserMutation,
  UserStatus,
} from '../gen/auth.api.generated';
import { useUsersGetUsersQuery } from '../service/auth.api';
import AddNewUserModal from '../components/modals/AddNewUserModal';
import AlertDialog from '../components/AlertDialog';
import ChangeCredentialsModal from '../components/modals/ChangeCredentialsModal';

const Administration : React.FC = () => {
  const dtoUser: UserOverview = {
    id: 0,
    userName: '',
    name: '',
    firstName: '',
    mailAddress: '',
    status: 'Restricted',
    roles: [''],
  };

  const [currentUser, setCurrentUser] = useState(dtoUser);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [filterValue, setFilterValue] = useState<string | null>();

  const usersArg: UsersGetUsersApiArg = {};
  const {
    data: users = [],
    isLoading: usersIsLoading,
  } = useUsersGetUsersQuery(usersArg);
  const [
    updateUser, { isLoading: deleteUserIsLoading },
  ] = useUsersUpdateUserMutation();

  const addNewUserHandler = () => {
    setCurrentUser(dtoUser);
    setIsUserModalOpen(true);
  };

  const editUser = (user: UserOverview) => {
    setCurrentUser(user);
    setIsUserModalOpen(true);
  };

  const editCredentials = (user: UserOverview) => {
    setCurrentUser(user);
    setIsCredentialsModalOpen(true);
  };

  const deleteUser = (user: UserOverview) => {
    setCurrentUser(user);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteUser = async () => {
    const userStatus: UserStatus = 'Deleted';
    const user = { ...currentUser, status: userStatus };

    const param: UsersUpdateUserApiArg = {
      userId: user.id,
      manageUserRequest: user,
    };
    updateUser(param);

    setCurrentUser(user);
    setIsDeleteAlertOpen(false);
  };

  const handleSearch = (searchedValue: { target: { value: string; }; } | null) => {
    if (searchedValue?.target.value) {
      setFilterValue(searchedValue.target.value);
    } else {
      setFilterValue(null);
    }
  };

  const getFilteredUsers = () => {
    if (filterValue) {
      return users.filter(
        (user) => user.name.toLowerCase().includes(filterValue.toLowerCase())
          || user.firstName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return users;
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
    toolbar: {
      display: 'grid',
      gridGap: '20px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'minmax(200px, 300px) minmax(200px, 300px)',
      },
    },
    newUserButton: {
    },
    search: {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Grid>
        <h1> Administration </h1>

        <Toolbar className={classes.toolbar}>
          <TextField
            type="string"
            label="Suche Mitarbeiter"
            onChange={handleSearch}
            className={classes.search}
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
        {
          usersIsLoading || deleteUserIsLoading
            ? <CircularProgress />
            : (
              <Table className={classes.table}>
                <TableBody>
                  {
                    getFilteredUsers().map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.firstName}
                          {' '}
                          {item.name}
                        </TableCell>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>{item.roles?.join(', ')}</TableCell>
                        <TableCell>
                          <IconButton data-testid="editUserButton" onClick={() => editUser(item)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton data-testid="editPasswordButton" onClick={() => editCredentials(item)}>
                            <VpnKeyIcon />
                          </IconButton>
                          <IconButton data-testid="deleteUserButton" onClick={() => deleteUser(item)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                }
                </TableBody>
              </Table>
            )
        }
      </Grid>
      <AddNewUserModal
        isModalOpen={isUserModalOpen}
        setIsModalOpen={setIsUserModalOpen}
        user={currentUser}
      />
      <ChangeCredentialsModal
        isModalOpen={isCredentialsModalOpen}
        setIsModalOpen={setIsCredentialsModalOpen}
        user={currentUser}
      />
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        setIsOpen={setIsDeleteAlertOpen}
        handleConfirm={confirmDeleteUser}
        content="Wollen sie den User wirklich löschen?"
      />
    </div>
  );
};
export default Administration;
