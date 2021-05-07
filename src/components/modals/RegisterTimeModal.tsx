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
import {
  useProjectsGetProjectsQuery,
  useProjectTimeslotsAddTimeslotMutation,
  useProjectTimeslotsUpdateTimeslotMutation,
} from '../../service/timeTrack.api';
import {
  ProjectOverview,
  ProjectTimeslotsAddTimeslotApiArg, ProjectTimeslotsUpdateTimeslotApiArg, TimeSlotOverview,
} from '../../gen/timeTrack.api.generated';

type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  timeSlot: TimeSlotOverview,
  setTimeSlot: React.Dispatch<React.SetStateAction<TimeSlotOverview>>,
};

const RegisterTimeModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  timeSlot,
  setTimeSlot,
  isModalOpen,
}: ChildComponentProps) => {
  const { data: projects = [] } = useProjectsGetProjectsQuery({ status: 'Active' });
  const projectDto: ProjectOverview = {
    id: 0,
    initial: '',
    name: '',
  };
  const [selectedProject, setSelectedProject] = useState(projectDto);

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const getProjectFromTimeSlot = () : ProjectOverview | undefined => projects
    .find((project) => project.id === timeSlot.project.key);

  // TimePicker has Problem with Time Changes, it resets the Date to current Date
  // This is a Workaround
  const fixDateChange = (currentDate: string, newDate: Date): Date | null => {
    const h = newDate.getHours();
    const m = newDate.getMinutes();
    const date = new Date(currentDate);

    if (!h || !m) return null;

    date.setHours(h);
    date.setMinutes(m);
    return date;
  };

  const handleStartChange = (start: Date | null) => {
    if (start) {
      const startDate = fixDateChange(timeSlot.start, start);
      if (!startDate) return;
      setTimeSlot({ ...timeSlot, start: startDate.toISOString() });
    }
  };

  const handleEndChange = (end: Date | null) => {
    if (end) {
      const endDate = fixDateChange(timeSlot.end, end);
      if (!endDate) return;
      setTimeSlot({ ...timeSlot, end: endDate.toISOString() });
    }
  };

  const [addTimeslot] = useProjectTimeslotsAddTimeslotMutation();
  const [updateTimeslot] = useProjectTimeslotsUpdateTimeslotMutation();

  const handleSave = () => {
    if (timeSlot.id) {
      try {
        const updateArgs: ProjectTimeslotsUpdateTimeslotApiArg = {
          timeslotId: timeSlot.id,
          projectId: selectedProject.id,
          manageTimeSlotRequest: timeSlot,
        };
        updateTimeslot(updateArgs);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const addArgs: ProjectTimeslotsAddTimeslotApiArg = {
          projectId: selectedProject.id,
          manageTimeSlotRequest: timeSlot,
        };
        addTimeslot(addArgs);
      } catch (e) {
        console.log(e);
      }
    }
    setIsModalOpen(false);
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
            value={getProjectFromTimeSlot()}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
            <TimePicker
              value={new Date(timeSlot.start)}
              onChange={handleStartChange}
                /* props need to be forwarded https://next.material-ui.com/api/time-picker/ */
                /* eslint-disable-next-line react/jsx-props-no-spreading */
              renderInput={(params: any) => <TextField {...params} margin="normal" />}
            />
            <TimePicker
              value={new Date(timeSlot.end)}
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
