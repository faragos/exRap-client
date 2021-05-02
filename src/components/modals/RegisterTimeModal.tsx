import React, { SyntheticEvent, useState } from 'react';
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
import { useProjectsGetProjectsQuery, useProjectTimeslotsAddTimeslotMutation } from '../../service/timeTrack.api';
import {
  ManageTimeSlotRequest,
  ProjectOverview,
  ProjectTimeslotsAddTimeslotApiArg,
} from '../../gen/timeTrack.api.generated';

type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  timeSlot: ManageTimeSlotRequest,
  setTimeSlot: React.Dispatch<React.SetStateAction<ManageTimeSlotRequest>>,
};

const RegisterTimeModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  timeSlot,
  setTimeSlot,
  isModalOpen,
}: ChildComponentProps) => {
  const { data: projects = [] } = useProjectsGetProjectsQuery({});
  const projectDto: ProjectOverview = {
    id: 0,
    initial: '',
    name: '',
  };
  const [selectedProject, setSelectedProject] = useState(projectDto);
  const handleClose = () => {
    setIsModalOpen(false);
    const initTimeSlot: ManageTimeSlotRequest = {
      startTime: '',
      endTime: '',
    };
    setTimeSlot(initTimeSlot);
  };

  const handleStartChange = (start: Date | null) => {
    if (start) {
      setTimeSlot({ ...timeSlot, startTime: start.toISOString() });
    }
  };

  const handleEndChange = (end: Date | null) => {
    if (end) {
      setTimeSlot({ ...timeSlot, endTime: end.toISOString() });
    }
  };

  const [
    addTimeslot,
  ] = useProjectTimeslotsAddTimeslotMutation();

  const handleSave = () => {
    const args: ProjectTimeslotsAddTimeslotApiArg = {
      projectId: selectedProject.id,
      manageTimeSlotRequest: timeSlot,
    };
    addTimeslot(args);
  };

  const selectProjectHandler = (
    event: SyntheticEvent<Element, Event>,
    value: ProjectOverview | null,
  ) => {
    if (value === null) return;

    setSelectedProject(value);
  };

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Zeiterfassung</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="combo-box-projects"
            options={projects}
            getOptionLabel={(option: ProjectOverview) => option.name}
            /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params: any) => <TextField {...params} label="Projects" variant="outlined" />}
            onChange={selectProjectHandler}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
            <TimePicker
              value={new Date(timeSlot.startTime)}
              onChange={handleStartChange}
                /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
                /* eslint-disable-next-line react/jsx-props-no-spreading */
              renderInput={(params: any) => <TextField {...params} margin="normal" />}
            />
            <TimePicker
              value={new Date(timeSlot.endTime)}
              onChange={handleEndChange}
                /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
                /* eslint-disable-next-line react/jsx-props-no-spreading */
              renderInput={(params: any) => <TextField {...params} margin="normal" />}
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
          <Button onClick={handleSave} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterTimeModal;
