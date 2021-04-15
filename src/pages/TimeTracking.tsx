import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import RegisterTimeModal from '../components/modals/RegisterTimeModal';

const TimeTracking : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div>
      <Calendar
        setIsModalOpen={setIsModalOpen}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
      <RegisterTimeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
    </div>
  );
};

export default TimeTracking;
