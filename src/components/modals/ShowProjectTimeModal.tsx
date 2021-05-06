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
};

const ShowProjectTimeModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
}: ChildComponentProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  function hoursRow(hours: number) {
    return hours;
  }

  function createRow(employeeName: string, employeeNameShort: string, hours: number) {
    const hoursTotal = hoursRow(hours);
    return {
      employeeName, employeeNameShort, hours, hoursTotal,
    };
  }

  interface Row {
    employeeName: string;
    employeeNameShort: string;
    hours: number;
    hoursTotal: number;
  }

  function subtotal(items: readonly Row[]) {
    return items.map(({ hoursTotal }) => hoursTotal).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow('Amend Lesi', 'ale', 90),
    createRow('Dominic Klinger', 'dki', 45),
    createRow('Christian Bisig', 'cbi', 17),
    createRow('Lukas Schlunegger', 'lsc', 20),
    createRow('Marco Endres', 'men', 43),
  ];

  const invoiceTotal = subtotal(rows);

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
                  <TableCell colSpan={2}>Mitarbeiter</TableCell>
                  <TableCell align="right">H</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.employeeName}>
                    <TableCell>{row.employeeName}</TableCell>
                    <TableCell>{row.employeeNameShort}</TableCell>
                    <TableCell align="right">
                      {row.hoursTotal}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    {invoiceTotal}
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
