import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';
import {
  UserOverview,
  useUserCredentialsUpdateCredentialMutation, UserCredentialsUpdateCredentialApiArg,
} from '../../gen/auth.api.generated';
import { PasswordFields, passwordValidation } from './AddNewUserModal';

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

  const [
    updateCredentials,
    { isLoading },
  ] = useUserCredentialsUpdateCredentialMutation();

  const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: target.value }));
  };

  const handleRepeatPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    passwordValidation(target, credentials.password);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const param: UserCredentialsUpdateCredentialApiArg = {
      userId: formState.id,
      manageCredentialRequest: credentials,
    };
    updateCredentials(param);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Passwort ändern</DialogTitle>
          <DialogContent>
            { isLoading
              ? <CircularProgress />
              : (
                <PasswordFields
                  handleRepeatPasswordChange={handleRepeatPasswordChange}
                  handlePasswordChange={handlePasswordChange}
                />
              )}
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
    </div>
  );
};

export default ChangeCredentialsModal;
