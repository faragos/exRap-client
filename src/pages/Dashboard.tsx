import React from 'react';
import {
  Table, TableBody, TableCell, TableRow,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import { useAppSelector } from '../hooks';
import printSpentTime from '../utils/utils';

const Dashboard : React.FC = () => {
  const authInfo = useAppSelector((state) => state.authInfo);
  const { data: contributorProjects } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Contributor' });
  const { data: managerProjects } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Manager' });

  const projectsOverview = [
    {
      id: 1,
      year: 2019,
      users: 20,
      projects: 4,
    }, {
      id: 2,
      year: 2020,
      users: 23,
      projects: 5,
    }, {
      id: 3,
      year: 2021,
      users: 30,
      projects: 8,
    }, {
      id: 4,
      year: 2022,
      users: 24,
      projects: 5,
    },
  ];

  const useStyles = makeStyles((theme) => ({
    table: {
      width: '50%',
      height: '50%',
      float: 'left',
      border: 10,
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

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Meine Projekte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            contributorProjects?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell align="right">{printSpentTime(item.contributorsSpentMinutes?.[authInfo.username])}</TableCell>
              </TableRow>
            ))
                }
        </TableBody>
      </Table>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Projekt/Mitarbeiter-Verlauf</TableCell>
            <TableCell align="center">Projekte/Mitarbeiter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            projectsOverview.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.year}
                </TableCell>
                <TableCell align="center">{item.projects / item.users}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Projektübersicht</TableCell>
            <TableCell align="center">Anzahl Projekte</TableCell>
            <TableCell align="right">Anzahl Mitarbeiter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            projectsOverview.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.year}
                </TableCell>
                <TableCell align="center">{item.projects}</TableCell>
                <TableCell align="right">{item.users}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Projektname</TableCell>
            <TableCell align="center">Anzahl Mitarbeiter</TableCell>
            <TableCell align="right">H</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            managerProjects?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell align="center">{Object.keys(item.contributorsSpentMinutes || {}).length}</TableCell>
                <TableCell align="right">{printSpentTime(item.totalSpentMinutes)}</TableCell>
              </TableRow>
            ))
                }
        </TableBody>
      </Table>
    </div>
  );
};
export default Dashboard;
