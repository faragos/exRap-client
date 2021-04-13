import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterTime } from './types';

const initialState: RegisterTime = {
  isModalOpen: false,
  start: '',
  end: '',
};

const timeTrackInfoSlice = createSlice({
  name: 'timeTrackInfo',
  initialState,
  reducers: {
    updateTimeModal: (state, { payload: { isModalOpen, start, end } }
    : PayloadAction<RegisterTime>) => {
      state.isModalOpen = isModalOpen;
      state.start = start;
      state.end = end;
    },
    setStartTime: (state, { payload } : PayloadAction<string>) => {
      state.start = payload;
    },
    setEndTime: (state, { payload } : PayloadAction<string>) => {
      state.end = payload;
    },
  },
});

export const {
  updateTimeModal,
  setStartTime,
  setEndTime,
} = timeTrackInfoSlice.actions;

export default timeTrackInfoSlice.reducer;
