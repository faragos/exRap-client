import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  TextField,
  InputAdornment,
  Grid,
  Button, IconButton, FormControlLabel, Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ProjectFormModal from '../components/modals/ProjectFormModal';
import DeleteDialog from '../components/modals/DeleteDialog';
import AddUserToProjectModal from '../components/modals/AddUserToProjectModal';
import ShowProjectTime from '../components/modals/ShowProjectTimeModal';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import { ProjectOverview } from '../gen/timeTrack.api.generated';

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
  newProjectButton: {
    position: 'absolute',
    right: '10px',
  },
  finishedCheckBox: {
    position: 'absolute',
    right: '300px',
  },
}));

const Projects : React.FC = () => {
  const classes = useStyles();
  const { data } = useProjectsGetProjectsQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogModalOpen, setIsDeleteDialogModalOpen] = useState(false);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isAddUserToProjectModalOpen, setIsAddUserToProjectModalOpen] = useState(false);
  const [isShowProjectTimeModalOpen, setIsShowProjectTimeModalOpen] = useState(false);
  const initProjectForm: ProjectOverview = {
    name: '',
    initial: '',
    description: '',
  };
  const [currentProject, setCurrentProject] = useState(initProjectForm);

  const addNewProjectHandler = () => {
    setCurrentProject(initProjectForm);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: ProjectOverview) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const deleteDialogHandler = (project: ProjectOverview) => {
    setCurrentProject(project);
    setIsDeleteDialogModalOpen(true);
  };

  const addUserToProjectHandler = () => {
    setIsAddUserToProjectModalOpen(true);
  };

  const showProjectTimeHandler = () => {
    setIsShowProjectTimeModalOpen(true);
  };

  const filterHelper = () => {
    if (isFilterEnabled) return ['Active', 'Finished'];
    return ['Active'];
  };

  return (
    <div>
      <Grid>
        <h1> Projects </h1>
        <Toolbar>
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
            variant="outlined"
            color="primary"
            className={classes.newProjectButton}
            onClick={addNewProjectHandler}
          >
            Neues Projekt erfassen
          </Button>
        </Toolbar>
        <Table className={classes.table}>
          <TableBody>
            {
                data
                  ?.filter((item) => filterHelper().includes(item.projectStatus || ''))
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.initial}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <IconButton onClick={showProjectTimeHandler}>
                          <EqualizerIcon />
                        </IconButton>
                        <IconButton onClick={addUserToProjectHandler} disabled={item.projectStatus !== 'Active'}>
                          <PersonAddIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEditProject(item)} disabled={item.projectStatus !== 'Active'}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteDialogHandler(item)} disabled={item.projectStatus !== 'Active'}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              }
          </TableBody>
        </Table>
      </Grid>
      <ProjectFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        project={currentProject}
      />
      <DeleteDialog
        isModalOpen={isDeleteDialogModalOpen}
        setIsModalOpen={setIsDeleteDialogModalOpen}
        project={currentProject}
      />
      <AddUserToProjectModal
        isModalOpen={isAddUserToProjectModalOpen}
        setIsModalOpen={setIsAddUserToProjectModalOpen}
      />
      <ShowProjectTime
        isModalOpen={isShowProjectTimeModalOpen}
        setIsModalOpen={setIsShowProjectTimeModalOpen}
      />
    </div>
  );
};

export default Projects;
