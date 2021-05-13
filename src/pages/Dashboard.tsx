import React from 'react';
import {
  Table, TableBody, TableCell, TableRow, Paper,
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

  /*  const chartData = [
    {
      barName: 'Anzahl Mitarbeiter',
      2020: 36,
      2021: 38,
    }, {
      barName: 'Anzahl Projekte',
      2020: 51,
      2021: 21,
    },
  ]; */

  /*
  const confidence = [
    {
      year: 2010,
      tvNews: 19,
      church: 29,
    }, {
      year: 2012,
      tvNews: 13,
      church: 32,
    }, {
      year: 2014,
      tvNews: 14,
      church: 35,
    }, {
      year: 2016,
      tvNews: 13,
      church: 32,
    }, {
      year: 2018,
      tvNews: 15,
      church: 28,
    },
  ];
*/

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
    paperProjectOverview: {
      width: 500,
      height: 500,
      margin: 30,
      flexDirection: 'row',
    },
    paperProjectUserTrend: {
      width: 500,
      height: 500,
      margin: 30,
      position: 'absolute',
      top: 0,
      right: 0,
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

      <Paper className={classes.paperProjectOverview} />

      <Paper className={classes.paperProjectUserTrend} />

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
