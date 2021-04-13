import React from 'react';
import Calendar from '../components/Calendar';
import RegisterTimeModal from '../components/modals/RegisterTimeModal';

const TimeTracking : React.FC = () => (
  <div>
    <Calendar />
    <RegisterTimeModal />
  </div>
);

export default TimeTracking;
