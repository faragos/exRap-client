import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';

const Dashboard : React.FC = () => {
  const myProject = [
    {
      id: 1,
      projectName: 'Projekt 1',
      hoursInProject: 108,
    },
    {
      id: 2,
      projectName: 'Projekt 1',
      hoursInProject: 80,
    },
    {
      id: 3,
      projectName: 'Projekt 1',
      hoursInProject: 50,
    },
  ];

  const projects = [
    {
      id: 1,
      projectName: 'Projekt 1',
      usersInProject: 5,
      hoursInProject: 108,
    },
    {
      id: 2,
      projectName: 'Projekt 2',
      usersInProject: 2,
      hoursInProject: 48,
    },
    {
      id: 3,
      projectName: 'Projekt 3',
      usersInProject: 2,
      hoursInProject: 48,
    },
  ];

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
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <h1> Dashboard </h1>

      <Table className={classes.table} style={{ width: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Meine Projekte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
                    myProject.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.projectName}
                        </TableCell>
                        <TableCell align="right">{item.hoursInProject}</TableCell>
                      </TableRow>
                    ))
                }
        </TableBody>
      </Table>

      <Table className={classes.table} style={{ width: 350, float: 'right' }}>
        <TableHead>
          <TableRow>
            <TableCell>Projektname</TableCell>
            <TableCell align="center">Anzahl Mitarbeiter</TableCell>
            <TableCell align="right">H</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
                    projects.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.projectName}
                        </TableCell>
                        <TableCell align="center">{item.usersInProject}</TableCell>
                        <TableCell align="right">{item.hoursInProject}</TableCell>
                      </TableRow>
                    ))
                }
        </TableBody>
      </Table>
    </div>
  );
};
export default Dashboard;
