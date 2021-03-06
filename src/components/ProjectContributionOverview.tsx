import React from 'react';
import {
  CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import { useAppSelector } from '../hooks';
import dashboardComponentStyles from '../styles/dashboardComponentStyles';
import sortOwnProjects from '../utils/sortOwnProjects';
import printSpentTime from '../utils/printSpentTime';

/**
 * Renders project contribution overview
 * @constructor
 */
const ProjectContributionOverview : React.FC = () => {
  const authInfo = useAppSelector((state) => state.authInfo);
  const {
    data: contributorProjects,
    isLoading: contributorIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Contributor' });

  const classes = dashboardComponentStyles();

  return (
    contributorIsLoading
      ? <CircularProgress />
      : (
        <TableContainer className={classes.table}>
          <Typography variant="h6">Meine Projekte</Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Projekt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                    sortOwnProjects(contributorProjects, authInfo)?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.name}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {printSpentTime(item.contributorsSpentMinutes?.[authInfo.username])}
                        </TableCell>
                      </TableRow>
                    ))
                  }
            </TableBody>
          </Table>
        </TableContainer>
      )
  );
};

export default ProjectContributionOverview;
