import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import RegisterTimeModal from '../components/modals/RegisterTimeModal';
import { ManageTimeSlotRequest } from '../gen/timeTrack.api.generated';

const TimeTracking : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // TODO: ManageTimeSLotRequest braucht comment attribute
  const timeSlotDto: ManageTimeSlotRequest = {
    start: '',
    end: '',
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
