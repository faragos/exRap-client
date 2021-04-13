import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  TextField,
  InputAdornment,
  Grid,
  Paper,
  Button, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EqualizerIcon from '@material-ui/icons/Equalizer';

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
}));

const paperStyle = {
  padding: 20,
  height: '50vh',
  width: 900,
  margin: '20px auto',
};

function Projects() {
  const classes = useStyles();

  const tableEntries = [
    {
      projectName: 'project1',
      projectNameShort: 'prj1',
      projectDescription: 'prj1 description',
      actions: 'Actions',
    },
    {
      projectName: 'project2',
      projectNameShort: 'prj2',
      projectDescription: 'prj2 description',
      actions: 'Actions',
    },
  ];

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
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
          <Button variant="outlined" color="primary" className={classes.newProjectButton}>
            Neues Projekt erfassen
          </Button>
        </Toolbar>
        <Table className={classes.table}>
          <TableBody>
            {
              tableEntries.map((item) => (
                <TableRow>
                  <TableCell>{item.projectName}</TableCell>
                  <TableCell>{item.projectNameShort}</TableCell>
                  <TableCell>{item.projectDescription}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EqualizerIcon />
                    </IconButton>
                    <IconButton>
                      <PersonAddIcon />
                    </IconButton>
                    <IconButton>
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
      </Paper>
    </Grid>
  );
}

export default Projects;
