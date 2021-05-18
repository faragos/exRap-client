import React from 'react';
import {
  CircularProgress,
  Table, TableBody, TableCell, TableRow,
  TableContainer, Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import { useAppSelector } from '../hooks';
import printSpentTime from '../utils/utils';
import { UsersGetUsersApiArg } from '../gen/auth.api.generated';
import { useUsersGetUsersQuery } from '../service/auth.api';

const Dashboard : React.FC = () => {
  const authInfo = useAppSelector((state) => state.authInfo);

  const {
    data: contributorProjects,
    isLoading: contributorIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Contributor' });

  const {
    data: managerProjects,
    isLoading: managerIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Manager' });

  const {
    data: allProjects,
    isLoading: allIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active' });

  const usersArg: UsersGetUsersApiArg = {};
  const {
    data: users = [],
  } = useUsersGetUsersQuery(usersArg);

  const useStyles = makeStyles((theme) => ({
    table: {
      width: '45%',
      height: '45%',
      float: 'left',
      margin: 10,
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
      { contributorIsLoading
        ? <CircularProgress />
        : (
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
        )}

      { allIsLoading
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
        )}

      { managerIsLoading
        ? <CircularProgress />
        : (
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
        )}
    </div>
  );
};
export default Dashboard;
