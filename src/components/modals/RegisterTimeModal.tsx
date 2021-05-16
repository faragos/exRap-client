import React, { SyntheticEvent, useEffect, useState } from 'react';
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
  useProjectTimeslotsAddTimeslotMutation, useProjectTimeslotsDeleteTimeslotMutation,
  useProjectTimeslotsUpdateTimeslotMutation,
} from '../../service/timeTrack.api';
import {
  ProjectOverview,
  ProjectTimeslotsAddTimeslotApiArg,
  ProjectTimeslotsDeleteTimeslotApiArg,
  ProjectTimeslotsUpdateTimeslotApiArg,
  TimeSlotOverview,
} from '../../gen/timeTrack.api.generated';
import AlertDialog from '../AlertDialog';
import ErrorDialog from '../ErrorDialog';

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
  const { data: projects = [], error: projectError } = useProjectsGetProjectsQuery({ status: 'Active' });
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [errorContent, setErrorContent] = useState('');
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const deleteTitle = 'Zeiteintrag';
  const deleteContent = 'Wollen sie den Zeiteintrag wirklich löschen?';

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

    if (h === null || m === null) return null;

    const date = new Date(currentDate);
    date.setHours(h);
    date.setMinutes(m);
    return date;
  };

  function isValidDate(d: Date) {
    return !Number.isNaN(d.getHours()) && !Number.isNaN(d.getMinutes());
  }

  const handleStartChange = (start: Date | null) => {
    if (start && isValidDate(start)) {
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

  const handleCommentChange = (event: any) => {
    setTimeSlot({ ...timeSlot, comment: event.target.value });
  };

  const [addTimeslot, { error: addTimeslotError }] = useProjectTimeslotsAddTimeslotMutation();
  const [
    updateTimeslot,
    { error: updateTimeslotError },
  ] = useProjectTimeslotsUpdateTimeslotMutation();

  const handleSave = () => {
    if (timeSlot.id) {
      const updateArgs: ProjectTimeslotsUpdateTimeslotApiArg = {
        timeslotId: timeSlot.id,
        projectId: timeSlot.project.key || 0,
        manageTimeSlotRequest: timeSlot,
      };
      updateTimeslot(updateArgs);
    } else {
      const addArgs: ProjectTimeslotsAddTimeslotApiArg = {
        projectId: timeSlot.project.key || 0,
        manageTimeSlotRequest: timeSlot,
      };
      addTimeslot(addArgs);
    }
    setIsModalOpen(false);
  };

  const [
    deleteTimeSlot,
    { error: deleteTimeslotError },
  ] = useProjectTimeslotsDeleteTimeslotMutation();
  const confirmDeleteTimeslot = () => {
    if (!timeSlot.project.key) return;

    const args: ProjectTimeslotsDeleteTimeslotApiArg = {
      timeslotId: timeSlot.id,
      projectId: timeSlot.project.key,
    };
    deleteTimeSlot(args);
    setIsDeleteAlertOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (addTimeslotError) {
      // @ts-ignore
      setErrorContent(addTimeslotError.message);
    }
    if (updateTimeslotError) {
      // @ts-ignore
      setErrorContent(updateTimeslotError.message);
    }
    if (deleteTimeslotError) {
      // @ts-ignore
      setErrorContent(deleteTimeslotError.message);
    }
    if (projectError) {
      // @ts-ignore
      setErrorContent(projectError.message);
    }
    setIsErrorAlertOpen(true);
  }, [addTimeslotError, updateTimeslotError, deleteTimeslotError, projectError]);

  const handleDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  const selectProjectHandler = (
    event: SyntheticEvent<Element, Event>,
    project: ProjectOverview | null,
  ) => {
    if (project === null) return;
    setTimeSlot({ ...timeSlot, project: { key: project.id, value: project.name } });
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
            renderInput={(params: any) => <TextField {...params} label="Projects" variant="outlined" required />}
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
            margin="dense"
            id="comment"
            label="Kommentar"
            fullWidth
            multiline
            rows={4}
            variant="filled"
            onChange={handleCommentChange}
            value={timeSlot.comment || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary" disabled={timeSlot.id === 0}>
            Löschen
          </Button>
          <Button onClick={handleClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleSave} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        setIsOpen={setIsDeleteAlertOpen}
        handleConfirm={confirmDeleteTimeslot}
        title={deleteTitle}
        content={deleteContent}
      />
      {(addTimeslotError || updateTimeslotError || deleteTimeslotError || projectError) && (
      <ErrorDialog
        isOpen={isErrorAlertOpen}
        setIsOpen={setIsErrorAlertOpen}
        content={errorContent}
      />
      )}
    </div>
  );
};

export default RegisterTimeModal;
