import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  TextField,
  InputAdornment,
  Grid,
  Button, IconButton, FormControlLabel, Checkbox, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ProjectFormModal from '../components/modals/ProjectFormModal';
import AddUserToProjectModal from '../components/modals/AddUserToProjectModal';
import ShowProjectTimeModal from '../components/modals/ShowProjectTimeModal';
import { useProjectsGetProjectsQuery, useProjectsUpdateProjectMutation } from '../service/timeTrack.api';
import { ProjectOverview, ProjectStatus, ProjectsUpdateProjectApiArg } from '../gen/timeTrack.api.generated';
import AlertDialog from '../components/AlertDialog';
import ErrorDialog from '../components/ErrorDialog';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointed',
    },
    '& tbody td:nth-child(4)': {
      width: '25%',
    },
  },
  toolbar: {
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'minmax(200px, 300px) 1fr minmax(200px, 300px)',
    },
  },
  newProjectButton: {
  },
  finishedCheckBox: {
  },
}));

const Projects : React.FC = () => {
  const classes = useStyles();
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const {
    data,
    error: projectsError,
    isLoading: projectsIsLoading,
  } = useProjectsGetProjectsQuery({ status: isFilterEnabled ? undefined : 'Active' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [errorContent, setErrorContent] = useState('');
  const [isAddUserToProjectModalOpen, setIsAddUserToProjectModalOpen] = useState(false);
  const [isShowProjectTimeModalOpen, setIsShowProjectTimeModalOpen] = useState(false);
  const dtoProject: ProjectOverview = {
    id: 0,
    name: '',
    initial: '',
    description: '',
    timeBudget: 0,
    projectStatus: 'Active',
  };

  const deleteDialogTitle = 'Projekt beenden';
  const deleteDialogContent = 'Wollen Sie das Projekt wirklich beenden?';

  const [currentProject, setCurrentProject] = useState(dtoProject);

  const addNewProjectHandler = () => {
    setCurrentProject(dtoProject);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: ProjectOverview) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const deleteProject = (project: ProjectOverview) => {
    setCurrentProject(project);
    setIsDeleteAlertOpen(true);
  };

  const [
    updateProject,
    { error: updateProjectError, isLoading: updateProjectIsLoading },
  ] = useProjectsUpdateProjectMutation();

  useEffect(() => {
    if (projectsError) {
      // @ts-ignore
      setErrorContent(projectsError.message);
    }
    if (updateProjectError) {
      // @ts-ignore
      setErrorContent(updateProjectError.message);
    }
    setIsErrorAlertOpen(true);
  }, [projectsError, updateProjectError]);

  const confirmDeleteProject = () => {
    const projectStatus: ProjectStatus = 'Finished';
    const project = { ...currentProject, projectStatus };
    const param: ProjectsUpdateProjectApiArg = {
      projectId: project.id,
      manageProjectRequest: project,
    };
    updateProject(param);

    setCurrentProject(project);
    setIsDeleteAlertOpen(false);
  };

  const addUserToProjectHandler = (project: ProjectOverview) => {
    setCurrentProject(project);
    setIsAddUserToProjectModalOpen(true);
  };

  const showProjectTimeHandler = (project: ProjectOverview) => {
    setCurrentProject(project);
    setIsShowProjectTimeModalOpen(true);
  };

  return (
    <div>
      <Grid>
        <h1> Projects </h1>
        <Toolbar className={classes.toolbar}>
          <TextField
            name="Suche"
            label="Suche"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            className={classes.finishedCheckBox}
            control={(
              <Checkbox
                name="checkedB"
                color="primary"
                onChange={() => setIsFilterEnabled(!isFilterEnabled)}
              />
                )}
            label="Beendet"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.newProjectButton}
            onClick={addNewProjectHandler}
          >
            Neues Projekt erfassen
          </Button>
        </Toolbar>

        { projectsIsLoading || updateProjectIsLoading
          ? <CircularProgress />
          : (
            <Table className={classes.table}>
              <TableBody>
                {
              data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.initial}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <IconButton data-testid="showTimeButton" onClick={() => showProjectTimeHandler(item)}>
                      <EqualizerIcon />
                    </IconButton>
                    <IconButton
                      data-testid="addProjectButton"
                      onClick={() => addUserToProjectHandler(item)}
                      disabled={item.projectStatus !== 'Active'}
                    >
                      <PersonAddIcon />
                    </IconButton>
                    <IconButton
                      data-testid="editProjectButton"
                      onClick={() => handleEditProject(item)}
                      disabled={item.projectStatus !== 'Active'}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      data-testid="deleteProjectButton"
                      onClick={() => deleteProject(item)}
                      disabled={item.projectStatus !== 'Active'}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
              </TableBody>
            </Table>
          )}
      </Grid>
      <ProjectFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        project={currentProject}
      />
      {isAddUserToProjectModalOpen
      && (
      <AddUserToProjectModal
        isModalOpen={isAddUserToProjectModalOpen}
        setIsModalOpen={setIsAddUserToProjectModalOpen}
        project={currentProject}
      />
      )}
      <ShowProjectTimeModal
        isModalOpen={isShowProjectTimeModalOpen}
        setIsModalOpen={setIsShowProjectTimeModalOpen}
        project={currentProject}
      />
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        setIsOpen={setIsDeleteAlertOpen}
        handleConfirm={confirmDeleteProject}
        title={deleteDialogTitle}
        content={deleteDialogContent}
      />
      {(projectsError || updateProjectError) && (
      <ErrorDialog
        isOpen={isErrorAlertOpen}
        setIsOpen={setIsErrorAlertOpen}
        content={errorContent}
      />
      )}
    </div>
  );
};

export default Projects;
