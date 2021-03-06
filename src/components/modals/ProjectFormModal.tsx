import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {
  useProjectsCreateProjectMutation, useProjectsUpdateProjectMutation,
} from '../../service/timeTrack.api';
import {
  ProjectOverview,
  ProjectsCreateProjectApiArg,
  ProjectsUpdateProjectApiArg,
} from '../../gen/timeTrack.api.generated';

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
  project: ProjectOverview,
};
/**
 * Renders the project form modal
 * @param setIsModalOpen - React hook state
 * @param isModalOpen - React hook state
 * @param project - Current project object
 * @constructor
 */
const ProjectFormModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
  project,
}: ChildComponentProps) => {
  const [projectForm, setProjectForm] = useState(project);
  const [
    createProject,
  ] = useProjectsCreateProjectMutation();

  const [
    updateProject,
  ] = useProjectsUpdateProjectMutation();

  useEffect(() => {
    setProjectForm(project);
  }, [project]);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setProjectForm(project);
    setIsModalOpen(false);
  };

  const handleSave = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (projectForm.id) {
      const param: ProjectsUpdateProjectApiArg = {
        projectId: projectForm.id,
        manageProjectRequest: projectForm,
      };
      updateProject(param);
    } else {
      const param: ProjectsCreateProjectApiArg = { manageProjectRequest: projectForm };
      createProject(param);
    }
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
              name="name"
              id="projectName"
              label="Projektname"
              variant="standard"
              fullWidth
              onChange={handleChange}
              value={projectForm.name}
              required
            />
            <TextField
              name="initial"
              margin="dense"
              id="projectAbbreviation"
              label="Projektk??rzel"
              variant="standard"
              fullWidth
              onChange={handleChange}
              value={projectForm.initial}
              required
            />
            <TextField
              name="description"
              margin="dense"
              id="comment"
              label="Kommentar"
              fullWidth
              multiline
              rows={4}
              variant="filled"
              onChange={handleChange}
              value={projectForm.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
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

export default ProjectFormModal;
