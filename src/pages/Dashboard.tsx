import React from 'react';
import {
  CircularProgress,
  Table, TableBody, TableCell, TableRow,
  TableContainer, Typography,
} from '@material-ui/core';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import { useAppSelector } from '../hooks';
import printSpentTime from '../utils/utils';
import { AuthInfo } from '../store/authInfo/types';
import { UsersGetUsersApiArg } from '../gen/auth.api.generated';
import { useUsersGetUsersQuery } from '../service/auth.api';

const Dashboard : React.FC = () => {
  const currentUser: AuthInfo = useAppSelector((state) => state.authInfo);
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

  const sortOwnProjects = () => contributorProjects?.slice().sort(
    (a, b) => {
      // eslint-disable-next-line max-len
      if (a.contributorsSpentMinutes?.[authInfo.username] && b.contributorsSpentMinutes?.[authInfo.username]) {
        // eslint-disable-next-line max-len
        return b?.contributorsSpentMinutes?.[authInfo.username] - a?.contributorsSpentMinutes?.[authInfo.username];
      }
      return 0;
    },
  );

  const useStyles = makeStyles(() => createStyles({
    container: {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '20px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    },
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
    <div>
      <h1> Dashboard </h1>
      <div className={classes.container}>
        { contributorIsLoading
          ? <CircularProgress />
          : (currentUser?.roles?.includes('ProjectContributor')
            && (
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
                  sortOwnProjects()?.map((item) => (
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
          )}

        { allIsLoading
          ? <CircularProgress />
          : (currentUser?.roles?.includes('SeniorManager')
            && (
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
          )}

        { managerIsLoading
          ? <CircularProgress />
          : (currentUser?.roles?.includes('ProjectManager')
            && (
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
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
