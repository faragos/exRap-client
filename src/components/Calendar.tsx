import React, { useEffect, useState } from 'react';
import FullCalendar, { DatesSetArg, EventClickArg, Ref } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  TimeSlotOverview,
  TimeslotsGetTimeslotsApiArg,
} from '../gen/timeTrack.api.generated';
import { useTimeslotsGetTimeslotsQuery } from '../service/timeTrack.api';

type ChildComponentProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setTimeSlot: React.Dispatch<React.SetStateAction<TimeSlotOverview>>,
};
/**
 * Renders the calendar
 * @param setIsModalOpen - React hook state
 * @param setTimeSlot - React hook state
 * @constructor
 */
const Calendar: React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  setTimeSlot,
}: ChildComponentProps) => {
  const [currentDateInfo, setCurrentDateInfo] = useState<DatesSetArg>();
  const args: TimeslotsGetTimeslotsApiArg = {
    startDate: currentDateInfo?.startStr,
    endDate: currentDateInfo?.endStr,
  };
  const { data: timeslots = [] } = useTimeslotsGetTimeslotsQuery(args);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const calendarRef: Ref<FullCalendar> = React.createRef();

  useEffect(() => {
    if (matches) {
      calendarRef?.current?.getApi().changeView('timeGridWeek');
    } else {
      calendarRef?.current?.getApi().changeView('timeGridDay');
    }
  }, [matches]);

  const handleSelect = (event: any) => {
    setIsModalOpen(true);
    const timeSlot: TimeSlotOverview = {
      id: 0,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      comment: '',
      project: {},
    };
    setTimeSlot(timeSlot);
  };

  const handleClick = (event: EventClickArg) => {
    setTimeSlot({
      id: parseInt(event.event.id, 10),
      start: event.event.startStr,
      end: event.event.endStr,
      comment: event.event.extendedProps.comment,
      project: {
        key: event.event.extendedProps.projectId,
        value: event.event.title,
      },
    });
    setIsModalOpen(true);
  };
  /**
   * Maps the timeslot objects to Event Object from fullcalendar
   */
  const timeSlotsToEventObject = () => timeslots.map((event) => ({
    id: event.id.toString(),
    title: event.project.value || '',
    start: new Date(event.start),
    end: new Date(event.end),
    extendedProps: {
      projectId: event.project.key,
      comment: event.comment,
    },
  }));
  return (
    <div className="App">
      <h1> Zeiterfassung </h1>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView={matches ? 'timeGridWeek' : 'timeGridDay'}
        allDaySlot={false}
        slotMinTime="05:00:00"
        slotMaxTime="22:00:00"
        events={timeSlotsToEventObject()}
        locale="de"
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: matches ? 'timeGridDay timeGridWeek dayGridMonth' : '',
        }}
        buttonText={{
          today: 'Heute',
          month: 'Monat',
          week: 'Woche',
          day: 'Tag',
        }}
        selectable
        select={handleSelect}
        eventClick={handleClick}
        datesSet={(dateInfo) => setCurrentDateInfo(dateInfo)}
        ref={calendarRef}
        stickyHeaderDates
        contentHeight="auto"
        eventColor="#a1887f"
        eventTextColor="#000"
        firstDay={1}
      />
    </div>
  );
};

export default Calendar;
