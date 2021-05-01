import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  UserOverview,
  UsersCreateUserApiArg,
  useUsersUpdateUserMutation,
  UsersUpdateUserApiArg,
} from '../../gen/auth.api.generated';
import { useUsersCreateUserMutation } from '../../service/auth.api';

type PasswordComponentProps = {
  handleCredentialsChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

const PasswordFields : React.FC<PasswordComponentProps> = (
  { handleCredentialsChange } : PasswordComponentProps,
) => (
  <>
    <TextField
      name="password"
      id="password"
      label="Passwort"
      variant="standard"
      type="password"
      required
      onChange={handleCredentialsChange}
    />

    <TextField
      name="passwordRepeat"
      id="passwordRepeat"
      label="Passwort wiederholen"
      variant="standard"
      type="password"
      required
      onChange={handleCredentialsChange}
    />
  </>
);

export { PasswordFields };

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
  const enrichUser = (initialUser: UserOverview) => ({
    ...initialUser,
    credentials: {
      password: '',
      passwordHint: '',
    },
  });

  const [formState, setFormState] = useState(enrichUser(user));

  React.useEffect(() => {
    setFormState(enrichUser(user));
  }, [user]);

  const [
    createUser,
  ] = useUsersCreateUserMutation();

  const [
    updateUser,
  ] = useUsersUpdateUserMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleCredentialsChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, credentials: { ...prev.credentials, [name]: value } }));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (formState?.id) {
      try {
        const param: UsersUpdateUserApiArg = {
          userId: formState.id,
          manageUserRequest: formState,
        };
        updateUser(param);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const param: UsersCreateUserApiArg = { createUserRequest: formState };
        createUser(param);
      } catch (err) {
        console.log(err);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Neuer Mitarbeiter erfassen</DialogTitle>
        <DialogContent>
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
            autoFocus
            id="mailAddress"
            name="mailAddress"
            label="Mail"
            variant="standard"
            placeholder="example@test.ch"
            value={formState.mailAddress}
            onChange={handleChange}
            fullWidth
          />
          {!formState.id && <PasswordFields handleCredentialsChange={handleCredentialsChange} />}
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
