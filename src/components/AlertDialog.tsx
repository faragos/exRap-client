import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

type AlertDialogProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleConfirm: () => void,
  title?: string,
  content?: string,
  buttonAgree?: string,
  buttonDisAgree?: string,
};

/**
 * Renders a generic alert dialog
 * @param isOpen - React hook state
 * @param setIsOpen - React hook state
 * @param handleConfirm - Handle confirm handler
 * @param title - Title of the alert dialog
 * @param content - Content of the alert dialog
 * @param buttonAgree - Button agree text
 * @param buttonDisAgree - Button disagree text
 * @constructor
 */
const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  setIsOpen,
  handleConfirm,
  title,
  content,
  buttonAgree,
  buttonDisAgree,
}: AlertDialogProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { content }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            { buttonDisAgree }
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus startIcon={<DeleteIcon />}>
            { buttonAgree }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.defaultProps = {
  title: 'Löschbestätigung',
  content: 'Wollen sie das Objekt wirklich löschen?',
  buttonAgree: 'Löschen',
  buttonDisAgree: 'Abbrechen',
};

export default AlertDialog;
