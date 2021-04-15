import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/core/Autocomplete';
import TimePicker from '@material-ui/lab/TimePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import deLocale from 'date-fns/locale/de';

const projects = [
  {
    name: 'Projekt 1',
  },
  {
    name: 'Projekt 2',
  },
  {
    name: 'Projekt 3',
  },
];
type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  startTime: string,
  setStartTime: React.Dispatch<React.SetStateAction<string>>,
  endTime: string,
  setEndTime: React.Dispatch<React.SetStateAction<string>>,
};

const RegisterTimeModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  isModalOpen,
}: ChildComponentProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
    setStartTime('');
    setEndTime('');
  };

  const handleStartChange = (start: Date | null) => {
    if (start) {
      setStartTime(start.toString());
    }
  };

  const handleEndChange = (end: Date | null) => {
    if (end) {
      setEndTime(end.toString());
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Zeiterfassung</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="combo-box-projects"
            options={projects}
            getOptionLabel={(option: any) => option.name}
            /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params: any) => <TextField {...params} label="Projects" variant="outlined" />}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
            <TimePicker
              value={new Date(startTime)}
              onChange={handleStartChange}
                /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
                /* eslint-disable-next-line react/jsx-props-no-spreading */
              renderInput={(params) => <TextField {...params} margin="normal" />}
            />
            <TimePicker
              value={new Date(endTime)}
              onChange={handleEndChange}
                /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
                /* eslint-disable-next-line react/jsx-props-no-spreading */
              renderInput={(params) => <TextField {...params} margin="normal" />}
            />
          </LocalizationProvider>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Kommentar"
            fullWidth
            multiline
            rows={4}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleClose} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterTimeModal;
