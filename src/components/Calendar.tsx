import React, { useEffect, useState } from 'react';
import FullCalendar, { DatesSetArg, EventClickArg } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ManageTimeSlotRequest, TimeslotsGetTimeslotsApiArg } from '../gen/timeTrack.api.generated';
import { useTimeslotsGetTimeslotsQuery } from '../service/timeTrack.api';

type ChildComponentProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setTimeSlot: React.Dispatch<React.SetStateAction<ManageTimeSlotRequest>>,
};
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

  const handleSelect = (event: any) => {
    setIsModalOpen(true);
    const timeSlot: ManageTimeSlotRequest = {
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    };
    setTimeSlot(timeSlot);
  };

  const handleClick = (event: EventClickArg) => {
    setTimeSlot({
      start: event.event.startStr,
      end: event.event.endStr,
    });
    setIsModalOpen(true);
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
        // TODO: API anpassen, das es start und end heisst.
        events={timeslots.map((event) => ({
          start: event.start,
          end: event.end,
        }))}
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
        datesSet={(dateInfo) => setCurrentDateInfo(dateInfo)}
      />
    </div>
  );
};

export default Calendar;
