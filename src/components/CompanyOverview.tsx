import React from 'react';
import {
  CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import { UsersGetUsersApiArg } from '../gen/auth.api.generated';
import { useUsersGetUsersQuery } from '../service/auth.api';

const CompanyOverview : React.FC = () => {
  const {
    data: allProjects,
    isLoading: allIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active' });

  const usersArg: UsersGetUsersApiArg = {};
  const {
    data: users = [],
  } = useUsersGetUsersQuery(usersArg);

  const useStyles = makeStyles(() => createStyles({
    table: {
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
    allIsLoading
      ? <CircularProgress />
      : (
        <TableContainer className={classes.table}>
          <Typography variant="h6">Firmenübersicht</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Jahr</TableCell>
                <TableCell align="center">Anzahl Projekte</TableCell>
                <TableCell align="right">Anzahl Mitarbeiter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={new Date().getFullYear()}>
                <TableCell>
                  {new Date().getFullYear()}
                </TableCell>
                <TableCell align="center">{allProjects?.length}</TableCell>
                <TableCell align="right">{users?.length}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
  );
};

export default CompanyOverview;
