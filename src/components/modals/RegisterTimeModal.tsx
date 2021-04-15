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
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEndTime, setStartTime, updateTimeModal } from '../../store/timeTrack/reducers';

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

const RegisterTimeModal : React.FC = () => {
  const dispatch = useAppDispatch();
  const timeTrack = useAppSelector((state) => state.timeTrackInfo);

  const handleClose = () => {
    const timeTrackData = {
      isModalOpen: false,
      start: '',
      end: '',
    };
    dispatch(updateTimeModal(timeTrackData));
  };

  const handleStartChange = (startTime: any) => {
    dispatch(setStartTime(startTime.toString()));
  };

  const handleEndChange = (endTime: any) => {
    dispatch(setEndTime(endTime.toString()));
  };

  return (
    <div>
      <Dialog open={timeTrack.isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
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
              value={new Date(timeTrack.start)}
              onChange={handleStartChange}
                /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
                /* eslint-disable-next-line react/jsx-props-no-spreading */
              renderInput={(params) => <TextField {...params} margin="normal" />}
            />
            <TimePicker
              value={new Date(timeTrack.end)}
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
