import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Grid,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SearchIcon from '@material-ui/icons/Search';
import ProjectFormModal from '../components/modals/ProjectFormModal';
import AddUserToProjectModal from '../components/modals/AddUserToProjectModal';
import ShowProjectTimeModal from '../components/modals/ShowProjectTimeModal';
import { useProjectsGetProjectsQuery, useProjectsUpdateProjectMutation } from '../service/timeTrack.api';
import { ProjectOverview, ProjectStatus, ProjectsUpdateProjectApiArg } from '../gen/timeTrack.api.generated';
import AlertDialog from '../components/AlertDialog';

const Projects : React.FC = () => {
  const dtoProject: ProjectOverview = {
    id: 0,
    name: '',
    initial: '',
    description: '',
    timeBudget: 0,
    projectStatus: 'Active',
  };

  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isAddUserToProjectModalOpen, setIsAddUserToProjectModalOpen] = useState(false);
  const [isShowProjectTimeModalOpen, setIsShowProjectTimeModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState<string | null>();
  const [currentProject, setCurrentProject] = useState(dtoProject);

  const {
    data: projects = [],
    isLoading: projectsIsLoading,
  } = useProjectsGetProjectsQuery({ status: isFilterEnabled ? undefined : 'Active' });

  const deleteDialogTitle = 'Projekt beenden';
  const deleteDialogContent = 'Wollen Sie das Projekt wirklich beenden?';

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
    { isLoading: updateProjectIsLoading },
  ] = useProjectsUpdateProjectMutation();

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

  const handleSearch = (searchedValue: { target: { value: string; }; } | null) => {
    if (searchedValue?.target.value) {
      setFilterValue(searchedValue.target.value);
    } else {
      setFilterValue(null);
    }
  };

  const getFilteredProjects = () => {
    if (filterValue) {
      return projects.filter(
        (project) => project.name.toLowerCase().includes(filterValue.toLowerCase())
            || project.initial.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return projects;
  };

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
    search: {
      marginTop: '10px',
      paddingBottom: '10px',
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Grid>
        <h1> Projects </h1>

        <Toolbar className={classes.toolbar}>
          <TextField
            type="string"
            label="Suche Projekte"
            onChange={handleSearch}
            className={classes.search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
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
                  getFilteredProjects().map((item) => (
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
    </div>
  );
};

export default Projects;
