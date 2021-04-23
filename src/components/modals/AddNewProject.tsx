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
}));

type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const AddNewProjectModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
}: ChildComponentProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const users = [
    { userName: 'lukas.schlunegger' },
    { userName: 'armend.lesi' },
    { userName: 'dominic.klinger' },
    { userName: 'christian.bisig' },
  ];

  const classes = useStyles();

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Neues Projekt erfassen</DialogTitle>
        <DialogContent className={classes.root}>
          <TextField
            autoFocus
            margin="dense"
            id="projectname"
            label="Projektname"
            variant="standard"
            fullWidth
          />
          <TextField
            margin="dense"
            id="projectAbbreviation"
            label="Projektkürzel"
            variant="standard"
            fullWidth
          />
          <TextField
            margin="dense"
            id="comment"
            label="Kommentar"
            fullWidth
            multiline
            rows={4}
            variant="filled"
          />
          <Autocomplete
            multiple
            id="addUser"
            options={users}
            getOptionLabel={(option) => option.userName}
            filterSelectedOptions
              /* props need to be forwarded https://material-ui.com/components/autocomplete/#checkboxes */
              /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params) => (<TextField {...params} variant="standard" label="Mitarbeiter hinzufügen" placeholder="Mitarbeiter" />)}
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

export default AddNewProjectModal;
