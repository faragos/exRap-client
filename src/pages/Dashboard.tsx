import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Table, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import { useProjectsGetProjectsQuery } from '../service/timeTrack.api';
import { useAppSelector } from '../hooks';
import printSpentTime from '../utils/utils';
import ErrorDialog from '../components/ErrorDialog';

const Dashboard : React.FC = () => {
  const authInfo = useAppSelector((state) => state.authInfo);
  const {
    data: contributorProjects,
    error: contributorError,
    isLoading: contributorIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Contributor' });
  const {
    data: managerProjects,
    error: managerError,
    isLoading: managerIsLoading,
  } = useProjectsGetProjectsQuery({ status: 'Active', role: 'Manager' });
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [errorContent, setErrorContent] = useState('');

  useEffect(() => {
    if (contributorError) {
      // @ts-ignore
      setErrorContent(contributorError.message);
    }
    if (managerError) {
      // @ts-ignore
      setErrorContent(managerError.message);
    }
    setIsErrorAlertOpen(true);
  }, [contributorError, managerError]);

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
      {(contributorError || managerError) && (
      <ErrorDialog
        isOpen={isErrorAlertOpen}
        setIsOpen={setIsErrorAlertOpen}
        content={errorContent}
      />
      )}
    </div>
  );
};
export default Dashboard;
