import React from 'react';
import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';
import RegisterTimeModal from '../components/modals/RegisterTimeModal';
import store from '../store/store';
import { TimeSlotOverview } from '../gen/timeTrack.api.generated';
import server from '../mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

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
  start: new Date(1466424490000).toISOString(),
  end: new Date(1466424490000).toISOString(),
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
  const projectsInput = await screen.findByLabelText(/Projects/);
  userEvent.type(projectsInput, 'project1');

  const commentInput = await screen.findByLabelText('Kommentar');
  userEvent.type(commentInput, 'test-comment');

  const saveButton = await screen.findByRole('button', { name: 'Speichern' });
  userEvent.click(saveButton);

  expect(setIsModalOpenMock).toBeCalledWith(false);
}, 10000);

test('delete timeslot', async () => {
  loadPage(timeSlotDto);
  const deleteButton = await screen.findByRole('button', { name: 'L??schen' });
  userEvent.click(deleteButton);
  const deleteAlert = await screen.findByText(/Wollen sie den Zeiteintrag wirklich l??schen?/);
  expect(deleteAlert).toBeInTheDocument();
});

test('delete timeslot modal', async () => {
  loadPage(timeSlotDto);
  const deleteButton = await screen.findByRole('button', { name: 'L??schen' });
  userEvent.click(deleteButton);
  const deleteAlert = await screen.findByText(/Wollen sie den Zeiteintrag wirklich l??schen?/);
  const allDelete = await screen.findAllByText('L??schen');
  userEvent.click(allDelete[1]);

  await waitFor(() => {
    expect(deleteAlert).not.toBeInTheDocument();
  });
});

test('cancel delete timeslot', async () => {
  loadPage(timeSlotDto);
  const deleteButton = await screen.findByRole('button', { name: 'L??schen' });
  userEvent.click(deleteButton);

  const deleteAlert = await screen.findByText(/Wollen sie den Zeiteintrag wirklich l??schen?/);
  const cancelButton = await screen.findByRole('button', { name: 'Abbrechen' });
  userEvent.click(cancelButton);

  await waitFor(() => {
    expect(deleteAlert).not.toBeInTheDocument();
  });
});

test('close modal', async () => {
  loadPage(initalTimeSlot);
  const closeButton = await screen.findByRole('button', { name: 'Abbrechen' });
  userEvent.click(closeButton);
  expect(setIsModalOpenMock).toBeCalledWith(false);
});

test('test if start date ist changed correctly', async () => {
  const mockDate = new Date(1466424490000);
  MockDate.set(mockDate);
  loadPage(timeSlotDto);
  const timepicker = (await screen.findAllByLabelText(/Choose time/))[0];
  await timepicker.click();
  const sixHours = await screen.findByLabelText('clock view is open, go to text input view');
  await sixHours.click();
  const input = await screen.findByPlaceholderText('hh:mm');
  fireEvent.input(input, { target: { value: '06:00' } });
  const closeButton = await screen.findByRole('button', { name: 'OK' });
  closeButton.click();

  const date = mockDate;
  date.setHours(6, 0);
  const finishedTimeSlot = { ...timeSlotDto, start: date.toISOString() };
  expect(setTimeSlotMock).toBeCalledWith(finishedTimeSlot);
  MockDate.reset();
});

test('test if end date ist changed correctly', async () => {
  const mockDate = new Date(1466424490000);
  MockDate.set(mockDate);
  loadPage(timeSlotDto);
  const timepicker = (await screen.findAllByLabelText(/Choose time/))[1];
  await timepicker.click();
  const sixHours = await screen.findByLabelText('clock view is open, go to text input view');
  await sixHours.click();
  const input = await screen.findByPlaceholderText('hh:mm');
  fireEvent.input(input, { target: { value: '06:00' } });
  const closeButton = await screen.findByRole('button', { name: 'OK' });
  closeButton.click();

  const date = mockDate;
  date.setHours(6, 0);
  const finishedTimeSlot = { ...timeSlotDto, end: date.toISOString() };
  expect(setTimeSlotMock).toBeCalledWith(finishedTimeSlot);
  MockDate.reset();
});
