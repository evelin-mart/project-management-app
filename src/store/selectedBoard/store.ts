import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData, selectedBoardState } from './interface';

const initialState = {
  id: '',
  title: '',
  description: '',
  columns: [] as ColumnData[],
};

export const selectedBoardSlice = createSlice({
  name: 'selectedBoard',
  initialState,
  reducers: {},
});
