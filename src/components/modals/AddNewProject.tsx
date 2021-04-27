import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  useProjectsCreateProjectMutation,
} from '../../service/timeTrack.api';
import { ManageProjectRequest, ProjectsCreateProjectApiArg } from '../../gen/timeTrack.api.generated';

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
  const emptyProjectForm = {
    projectName: '',
    shortName: '',
    comment: '',
  };
  const [newProjectForm, setNewProjectForm] = useState(emptyProjectForm);
  const [
    createProject,
  ] = useProjectsCreateProjectMutation();

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (event: any) => {
    console.log(event.form.isValid);
    const args: ManageProjectRequest = {
      name: newProjectForm.projectName,
      initial: newProjectForm.shortName,
      description: newProjectForm.comment,
    };
    console.log(args);
    const param: ProjectsCreateProjectApiArg = { manageProjectRequest: args };
    await createProject(param);

    setNewProjectForm(emptyProjectForm);
    setIsModalOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Neues Projekt erfassen</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent className={classes.root}>
            <TextField
              autoFocus
              margin="dense"
              name="projectName"
              id="projectName"
              label="Projektname"
              variant="standard"
              fullWidth
              onChange={handleChange}
              required
            />
            <TextField
              name="shortName"
              margin="dense"
              id="projectAbbreviation"
              label="Projektkürzel"
              variant="standard"
              fullWidth
              onChange={handleChange}
              required
            />
            <TextField
              name="comment"
              margin="dense"
              id="comment"
              label="Kommentar"
              fullWidth
              multiline
              rows={4}
              variant="filled"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Abbrechen
            </Button>
            <Button color="primary" type="submit">
              Speichern
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddNewProjectModal;
