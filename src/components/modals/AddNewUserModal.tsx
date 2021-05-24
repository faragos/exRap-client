import React, {
  ChangeEvent, SyntheticEvent, useState,
} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/core/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {
  UserOverview,
  UsersCreateUserApiArg,
  useUsersUpdateUserMutation,
  UsersUpdateUserApiArg, RoleOverview,
  UsersGetUserApiArg, UserRolesOverwriteRolesApiArg,
  CreateUserRequest, ManageCredentialRequest, UserInformation,
} from '../../gen/auth.api.generated';
import {
  useRolesGetRolesQuery, useUserRolesOverwriteRolesMutation,
  useUsersCreateUserMutation, useUsersGetUserQuery,
} from '../../service/auth.api';

const useStyles = makeStyles((theme) => ({
  halfField: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(50% - ${theme.spacing(1)})`,
    },
  },
  fieldRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

type PasswordComponentProps = {
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleRepeatPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

const passwordValidation = (target: EventTarget & HTMLInputElement, value: string) => {
  let validText = '';
  if (target.value !== value) {
    validText = 'Passwörter stimmen nicht überein';
  }
  target.setCustomValidity(validText);
};

const PasswordFields : React.FC<PasswordComponentProps> = (
  { handlePasswordChange, handleRepeatPasswordChange } : PasswordComponentProps,
) => {
  const classes = useStyles();
  return (
    <div className={classes.fieldRow}>
      <TextField
        name="password"
        id="password"
        label="Passwort"
        variant="standard"
        type="password"
        required
        onChange={handlePasswordChange}
        inputProps={{ minLength: 8 }}
        className={classes.halfField}
      />

      <TextField
        name="passwordRepeat"
        id="passwordRepeat"
        label="Passwort wiederholen"
        variant="standard"
        type="password"
        required
        onChange={handleRepeatPasswordChange}
        inputProps={{ minLength: 8 }}
        className={classes.halfField}
      />
    </div>
  );
};

export { PasswordFields, passwordValidation };

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

  const classes = useStyles();

  const roleDto: RoleOverview[] = [];
  const getRoles = (currentFullUser? : UserInformation) : RoleOverview[] => {
    if (currentFullUser?.roles && currentFullUser.roles.length > 0) {
      return currentFullUser.roles;
    }
    return roleDto;
  };

  const [formState, setFormState] = useState(enrichUser(user));
  const [currentRoles, setCurrentRoles] = useState(roleDto);
  const arg: UsersGetUserApiArg = {
    userId: user.id,
  };
  const { data: fullUser } = useUsersGetUserQuery(arg);

  React.useEffect(() => {
    setFormState(enrichUser(user));
    setCurrentRoles(getRoles(fullUser));
  }, [user, fullUser]);

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

  const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line max-len
    setFormState((prev) => ({ ...prev, credentials: { ...prev.credentials, password: target.value } as ManageCredentialRequest }));
  };

  const handleRepeatPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (formState.credentials) passwordValidation(target, formState.credentials?.password);
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
      const param: UsersUpdateUserApiArg = {
        userId: formState.id,
        manageUserRequest: formState,
      };
      prepareUpdateRoles(formState.id);
      updateUser(param);
    } else {
      const param: UsersCreateUserApiArg = { createUserRequest: formState };
      const result = await createUser(param).unwrap();
      if (result) {
        prepareUpdateRoles(result.id);
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
    <div>

      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Neuer Mitarbeiter erfassen</DialogTitle>
          <DialogContent className={classes.root}>
            <div className={classes.fieldRow}>
              <TextField
                autoFocus
                id="firstName"
                name="firstName"
                label="Vorname"
                variant="standard"
                placeholder="Max"
                value={formState.firstName}
                onChange={handleChange}
                className={classes.halfField}
                required
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                id="name"
                name="name"
                label="Nachname"
                variant="standard"
                placeholder="Muster"
                value={formState.name}
                onChange={handleChange}
                className={classes.halfField}
                required
                inputProps={{ maxLength: 50 }}
              />
            </div>
            <TextField
              id="userName"
              name="userName"
              label="Kürzel"
              variant="standard"
              placeholder="abc"
              value={formState.userName}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 6 }}
            />
            <TextField
              id="mailAddress"
              name="mailAddress"
              label="Mail"
              variant="standard"
              placeholder="example@test.ch"
              value={formState.mailAddress}
              onChange={handleChange}
              fullWidth
              required
              type="email"
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
            {!formState.id
            && (
            <PasswordFields
              handlePasswordChange={handlePasswordChange}
              handleRepeatPasswordChange={handleRepeatPasswordChange}
            />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Abbrechen
            </Button>
            <Button type="submit" color="primary" variant="contained" startIcon={<SaveIcon />}>
              Speichern
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default AddNewUserModal;
