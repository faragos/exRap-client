import React, { useEffect, useState } from 'react';
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
import { PasswordFields } from './AddNewUserModal';
import ErrorDialog from '../ErrorDialog';

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
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [errorContent, setErrorContent] = useState('');

  React.useEffect(() => {
    setFormState(user);
  }, [user]);

  const [
    updateCredentials,
    { error, isLoading },
  ] = useUserCredentialsUpdateCredentialMutation();

  useEffect(() => {
    // @ts-ignore
    setErrorContent(error?.message);
    setIsErrorAlertOpen(true);
  }, [error]);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setCredentials((prev) => ({ ...prev, [name]: value }));

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
              : <PasswordFields handleCredentialsChange={handleChange} />}
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
      {(error) && (
        <ErrorDialog
          isOpen={isErrorAlertOpen}
          setIsOpen={setIsErrorAlertOpen}
          content={errorContent}
        />
      )}
    </div>
  );
};

export default ChangeCredentialsModal;
