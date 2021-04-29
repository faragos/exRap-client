import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  UserOverview,
  useUserCredentialsAddCredentialMutation, UserCredentialsAddCredentialApiArg,
} from '../../gen/auth.api.generated';

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

const ChangeCredentialsModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
  user,
}: ChildComponentProps) => {
  const [formState, setFormState] = useState(user);
  const [credentials, setCredentials] = useState({ password: '', passwordHint: '' });

  React.useEffect(() => {
    setFormState(user);
  }, [user]);

  // const { data } = useRolesGetRolesQuery({});

  const [
    updateCredentials, // This is the mutation trigger
  ] = useUserCredentialsAddCredentialMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setCredentials((prev) => ({ ...prev, [name]: value }));

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const param: UserCredentialsAddCredentialApiArg = {
      userId: formState.id,
      manageCredentialRequest: credentials,
    };
    updateCredentials(param);
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Passwort ändern</DialogTitle>
        <DialogContent>
          <PasswordFields handleCredentialsChange={handleChange} />
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

export default ChangeCredentialsModal;
