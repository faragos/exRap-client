import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type AlertDialogProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleConfirm: () => void,
  title?: String,
  content?: String,
  buttonAgree?: String,
  buttonDisAgree?: String,
};

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
          <Button onClick={handleConfirm} color="primary" autoFocus>
            { buttonAgree }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.defaultProps = {
  title: 'Alert',
  content: 'Wollen sie das Objekt wirklich löschen?',
  buttonAgree: 'Agree',
  buttonDisAgree: 'Disagree',
};

export default AlertDialog;
