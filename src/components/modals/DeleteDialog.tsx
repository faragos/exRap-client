import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  ProjectOverview,
  ProjectsUpdateProjectApiArg,
} from '../../gen/timeTrack.api.generated';
import { useProjectsUpdateProjectMutation } from '../../service/timeTrack.api';

type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  project: ProjectOverview,
};

const DeleteDialog : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
  project,
}: ChildComponentProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [
    updateProject,
  ] = useProjectsUpdateProjectMutation();

  const handleEnd = async () => {
    if (!project.id) return;

    const param: ProjectsUpdateProjectApiArg = {
      projectId: project.id,
      manageProjectRequest: {
        name: project.name || '',
        initial: project.initial || '',
        description: project.description,
        projectStatus: 'Finished',
      },
    };
    await updateProject(param);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Projekt beenden</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Wollen Sie das Projekt wirklich beenden?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleEnd} color="primary" autoFocus>
            Beenden
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
