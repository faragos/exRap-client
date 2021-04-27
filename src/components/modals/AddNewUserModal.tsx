import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  UserOverview,
  UsersCreateUserApiArg,
  useUsersUpdateUserMutation,
  UsersUpdateUserApiArg,
  ManageUserRequest,
} from '../../gen/auth.api.generated';
import { useUsersCreateUserMutation } from '../../service/auth.api';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  firstPasswordField: {
    marginRight: theme.spacing(3),
  },
}));

type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  user: UserOverview,
};

const AddNewUserModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
  user,
}: ChildComponentProps) => {
  const [formState, setFormState] = useState(user);

  React.useEffect(() => {
    setFormState(user);
  }, [user]);

  // const { data } = useRolesGetRolesQuery({});

  const [
    createUser, // This is the mutation trigger
  ] = useUsersCreateUserMutation();

  const [
    updateUser, // This is the mutation trigger
  ] = useUsersUpdateUserMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (formState.id) {
      try {
        const param: UsersUpdateUserApiArg = {
          userId: formState.id,
          manageUserRequest: formState as ManageUserRequest,
        };
        updateUser(param);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const param: UsersCreateUserApiArg = { manageUserRequest: formState as ManageUserRequest };
        createUser(param);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const classes = useStyles();

  return (
    <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Neuer Mitarbeiter erfassen</DialogTitle>
        <DialogContent className={classes.root}>
          <TextField
            autoFocus
            id="firstName"
            name="firstName"
            label="Vorname"
            variant="standard"
            placeholder="Max"
            value={formState.firstName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Nachname"
            variant="standard"
            placeholder="Muster"
            value={formState.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            id="userName"
            name="userName"
            label="Kürzel"
            variant="standard"
            placeholder="abc"
            value={formState.userName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            className={classes.firstPasswordField}
            name="password"
            id="password"
            label="Passwort"
            variant="standard"
            type="password"
            required
            onChange={handleChange}
          />
          <TextField
            name="passwordRepeat"
            id="passwordRepeat"
            label="Passwort wiederholen"
            variant="standard"
            type="password"
            required
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Abbrechen
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddNewUserModal;
