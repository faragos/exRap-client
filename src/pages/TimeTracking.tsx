import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import RegisterTimeModal from '../components/modals/RegisterTimeModal';
import { TimeSlotOverview } from '../gen/timeTrack.api.generated';

const TimeTracking : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeSlotDto: TimeSlotOverview = {
    id: 0,
    start: '',
    end: '',
    comment: '',
    project: {
      key: undefined,
      value: undefined,
    },
  };
  const [timeSlot, setTimeSlot] = useState(timeSlotDto);

  return (
    <div>
      <Calendar
        setIsModalOpen={setIsModalOpen}
        setTimeSlot={setTimeSlot}
      />
      <RegisterTimeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        timeSlot={timeSlot}
        setTimeSlot={setTimeSlot}
      />
    </div>
  );
};

export default TimeTracking;
