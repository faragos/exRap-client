import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@material-ui/core';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import { Stack, Animation } from '@devexpress/dx-react-chart';

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

  const chartData = [
    {
      barName: 'Anzahl Mitarbeiter',
      2020: 36,
      2021: 38,
    }, {
      barName: 'Anzahl Projekte',
      2020: 51,
      2021: 21,
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
    paper: {
      width: 500,
      height: 500,
      margin: 30,
      flexDirection: 'row',
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

      <Paper className={classes.paper}>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="2020"
            valueField="2020"
            argumentField="barName"
            color="#D3D3D3"
          />
          <BarSeries
            name="2021"
            valueField="2021"
            argumentField="barName"
            color="#808080"
          />
          <Animation />
          <Legend position="bottom" />
          <Title text="Projektübersicht" />
          <Stack />
        </Chart>
      </Paper>

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
