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
                data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.initial}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <IconButton>
                        <EqualizerIcon />
                      </IconButton>
                      <IconButton>
                        <PersonAddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditProject(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
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
    </div>
  );
};

export default Projects;
