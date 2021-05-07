import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/core/Autocomplete';
import {
  UserOverview,
  UsersCreateUserApiArg,
  useUsersUpdateUserMutation,
  UsersUpdateUserApiArg, RoleOverview,
  UsersGetUserApiArg, UserRolesOverwriteRolesApiArg, CreateUserRequest, ManageCredentialRequest,
} from '../../gen/auth.api.generated';
import {
  useRolesGetRolesQuery, useUserRolesOverwriteRolesMutation,
  useUsersCreateUserMutation, useUsersGetUserQuery,
} from '../../service/auth.api';

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
  const enrichUser = (initialUser: UserOverview) : UserOverview & CreateUserRequest => ({
    ...initialUser,
    credentials: {
      password: '',
      passwordHint: '',
    },
  });

  const roleDto: RoleOverview[] = [];
  const [formState, setFormState] = useState(enrichUser(user));
  const [currentRoles, setCurrentRoles] = useState(roleDto);
  const arg: UsersGetUserApiArg = {
    userId: user.id,
  };
  const { data: fullUser } = useUsersGetUserQuery(arg);

  React.useEffect(() => {
    setFormState(enrichUser(user));
    setCurrentRoles(roleDto);
  }, [user]);

  React.useEffect(() => {
    if (fullUser?.roles && fullUser.roles.length > 0) {
      setCurrentRoles(fullUser.roles);
    }
  }, [fullUser]);

  const { data: roles = [] } = useRolesGetRolesQuery({});

  const [
    createUser,
  ] = useUsersCreateUserMutation();

  const [
    updateUser,
  ] = useUsersUpdateUserMutation();

  const [
    updateRoles,
  ] = useUserRolesOverwriteRolesMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleCredentialsChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line max-len
    setFormState((prev) => ({ ...prev, credentials: { ...prev.credentials, [name]: value } as ManageCredentialRequest }));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const prepareUpdateRoles = (id : number) => {
    if (formState.roles) {
      const finalRoles = currentRoles.map((r) => r.name);
      const args: UserRolesOverwriteRolesApiArg = {
        userId: id,
        body: finalRoles,
      };
      updateRoles(args);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (formState?.id) {
      try {
        const param: UsersUpdateUserApiArg = {
          userId: formState.id,
          manageUserRequest: formState,
        };
        prepareUpdateRoles(formState.id);
        updateUser(param);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const param: UsersCreateUserApiArg = { createUserRequest: formState };
        const result = await createUser(param).unwrap();
        if (result) {
          prepareUpdateRoles(result.id);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsModalOpen(false);
  };
  const addRoleHandler = (
    event: SyntheticEvent<Element, Event>,
    value: RoleOverview[],
  ) => {
    setCurrentRoles(value);
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
          <Autocomplete
            multiple
            id="addRole"
            options={roles}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
              /* props need to be forwarded https://material-ui.com/components/autocomplete/#checkboxes */
              /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params) => (<TextField {...params} variant="standard" label="Rolle hinzufügen" placeholder="Rollen" />)}
            onChange={addRoleHandler}
            getOptionSelected={(option, value) => option.name === value.name}
            value={currentRoles}
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
