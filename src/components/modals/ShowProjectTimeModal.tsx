import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { ProjectOverview } from '../../gen/timeTrack.api.generated';
import printSpentTime from '../../utils/printSpentTime';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  hideBorder: {
    border: 0,
  },
});

type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  project: ProjectOverview,
};

const ShowProjectTimeModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
  project,
}: ChildComponentProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const userTimeInProject: ReactJSXElement[] = [];

  Object.keys(project.contributorsSpentMinutes || {}).forEach((user) => {
    userTimeInProject.push(
      <TableRow key={user}>
        <TableCell>{user}</TableCell>
        <TableCell align="right">
          {printSpentTime(project.contributorsSpentMinutes?.[user])}
        </TableCell>
      </TableRow>,
    );
  });

  const classes = useStyles();

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} maxWidth="xl" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Projektübersicht</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={1}>Mitarbeiter</TableCell>
                  <TableCell align="right">Aufgewendete Zeit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userTimeInProject}
                <TableRow>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">
                    {printSpentTime(project.totalSpentMinutes)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schliessen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShowProjectTimeModal;
