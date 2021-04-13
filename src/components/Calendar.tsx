import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useAppDispatch } from '../hooks';
import { updateTimeModal } from '../store/timeTrack/reducers';

const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSelect = (event: any) => {
    const timeTrack = {
      isModalOpen: true,
      start: event.start.toString(),
      end: event.end.toString(),
    };
    dispatch(updateTimeModal(timeTrack));
  };

  const handleClick = () => {

  };

  return (
    <div className="App">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        allDaySlot={false}
        slotMinTime="05:00:00"
        slotMaxTime="22:00:00"
        events={[
          { title: 'event 1', date: '2021-03-25' },
          { title: 'event 2', date: '2021-03-24' },
        ]}
        locale="de"
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'timeGridDay timeGridWeek dayGridMonth',
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
      />
    </div>
  );
};

export default Calendar;
