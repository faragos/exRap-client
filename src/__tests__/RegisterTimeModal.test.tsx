import React from 'react';
import {
  cleanup, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import RegisterTimeModal from '../components/modals/RegisterTimeModal';
import store from '../store/store';
import { TimeSlotOverview } from '../gen/timeTrack.api.generated';

const setIsModalOpenMock = jest.fn();
const setTimeSlotMock = jest.fn();

const initalTimeSlot: TimeSlotOverview = {
  id: 0,
  start: '',
  end: '',
  comment: '',
  project: {
    key: undefined,
    value: undefined,
  },
};
const timeSlotDto: TimeSlotOverview = {
  id: 1,
  start: '10:00',
  end: '12:00',
  comment: 'comment',
  project: {
    key: 1,
    value: 'p1',
  },
};

const loadPage = (timeSlot: TimeSlotOverview) => {
  render(
    <Provider store={store}>
      <RegisterTimeModal
        isModalOpen
        setIsModalOpen={setIsModalOpenMock}
        timeSlot={timeSlot}
        setTimeSlot={setTimeSlotMock}
      />
    </Provider>,
  );
};

afterEach(cleanup);

test('add new timeslot', async () => {
  loadPage(initalTimeSlot);
  const projectsInput = await screen.findByLabelText('Projects');
  userEvent.type(projectsInput, 'project1');

  const commentInput = await screen.findByLabelText('Kommentar');
  userEvent.type(commentInput, 'test-comment');

  const saveButton = await screen.findByRole('button', { name: 'Speichern' });
  userEvent.click(saveButton);

  expect(commentInput.value).toEqual('test-comment');
  expect(setIsModalOpenMock).toBeCalledWith(false);
});

test('update timeslot', async () => {
  loadPage(timeSlotDto);
  const timeInputs = await screen.findAllByLabelText('Choose time');
  const startInput = timeInputs[0];
  const endInput = timeInputs[1];
  userEvent.type(startInput, '10:0');
  userEvent.type(endInput, '12:0');
});

test('delete timeslot', async () => {
  loadPage(timeSlotDto);
  const deleteButton = await screen.findByRole('button', { name: 'Löschen' });
  userEvent.click(deleteButton);
  const deleteAlert = await screen.findByText(/Wollen sie den Zeiteintrag wirklich löschen?/);
  expect(deleteAlert).toBeInTheDocument();
});

test('close modal', async () => {
  loadPage(initalTimeSlot);
  const closeButton = await screen.findByRole('button', { name: 'Abbrechen' });
  userEvent.click(closeButton);
  expect(setIsModalOpenMock).toBeCalledWith(false);
});
