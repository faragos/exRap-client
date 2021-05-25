import React from 'react';
import {
  CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import printSpentTime from '../utils/printSpentTime';
import dashboardComponentStyles from '../styles/dashboardComponentStyles';

/**
 * Renders project manager overview
 * @constructor
 */
const ProjectManagerOverview : React.FC = () => {
  const {
    data: managerProjects,
    isLoading: managerIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Manager' });

  const classes = dashboardComponentStyles();

  return (
    managerIsLoading
      ? <CircularProgress />
      : (
        <TableContainer className={classes.table}>
          <Typography variant="h6">Projektleitung</Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Projekt</TableCell>
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
        </TableContainer>
      )
  );
};

export default ProjectManagerOverview;
