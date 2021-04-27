import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  IconButton, Table, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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

const AddUserToProjectModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
}: ChildComponentProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const users = [
    {
      id: '1',
      userName: 'Lukas Schlunegger',
    },
    {
      id: '2',
      userName: 'Armend Lesi',
    },
  ];

  const usersInProject = [
    {
      id: '1',
      userName: 'Lukas Schlunegger',
      userInitial: 'lsc',
      userRole: 'System Engineer',
    },
    {
      id: '2',
      userName: 'Armend Lesi',
      userInitial: 'ale',
      userRole: 'Projektleiter',
    },
  ];

  const classes = useStyles();

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Mitarbeiterverwaltung Projekt X</DialogTitle>
        <DialogContent className={classes.root}>
          <Autocomplete
            id="addUser"
            options={users}
            getOptionLabel={(option) => option.userName}
            filterSelectedOptions
                        /* props need to be forwarded https://material-ui.com/components/autocomplete/#checkboxes */
                        /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params) => (<TextField {...params} variant="standard" label="Mitarbeiter hinzufügen" placeholder="Mitarbeiter" />)}
          />
          <Table>
            <TableBody>
              {
                                usersInProject.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.userName}</TableCell>
                                    <TableCell>{item.userInitial}</TableCell>
                                    <TableCell>{item.userRole}</TableCell>
                                    <TableCell>
                                      <IconButton>
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))
                            }
            </TableBody>
          </Table>
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

export default AddUserToProjectModal;
