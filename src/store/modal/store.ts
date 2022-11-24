import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

const initialState = {
  open: false,
  content: null as ReactNode,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(_, action: PayloadAction<ReactNode>) {
      return {
        open: true,
        content: action.payload,
      };
    },
    closeModal() {
      return initialState;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
