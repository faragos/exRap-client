import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
};

const AddNewUserModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
}: ChildComponentProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const roles = [
    { name: 'System Engineer' },
    { name: 'Projektleiter' },
    { name: 'Frontend Developer' },
    { name: 'Backend Developer' },
  ];

  const projects = [
    { initial: 'sdk' },
    { initial: 'asd' },
    { initial: 'wel' },
    { initial: 'zkg' },
  ];

  const classes = useStyles();

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Neuer Mitarbeiter erfassen</DialogTitle>
        <DialogContent className={classes.root}>
          <TextField
            autoFocus
            id="userName"
            label="Mitarbeitername"
            variant="standard"
            placeholder="Max Muster"
            fullWidth
          />
          <Autocomplete
            multiple
            id="addProjectInitial"
            options={projects}
            getOptionLabel={(option) => option.initial}
            filterSelectedOptions
              /* props need to be forwarded https://material-ui.com/components/autocomplete/#checkboxes */
              /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params) => (<TextField {...params} variant="standard" label="Projektkürzel" placeholder="Projektkürzel wählen" />)}
          />
          <TextField
            className={classes.firstPasswordField}
            id="password"
            label="Passwort"
            variant="standard"
            type="password"
            required
          />
          <TextField
            id="passwordRepeat"
            label="Passwort wiederholen"
            variant="standard"
            type="password"
            required
          />
          <Autocomplete
            id="addRole"
            options={roles}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
                        /* props need to be forwarded https://material-ui.com/components/autocomplete/#checkboxes */
                        /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params) => (<TextField {...params} variant="standard" label="Rolle" placeholder="Rolle wählen" />)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleClose} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewUserModal;
