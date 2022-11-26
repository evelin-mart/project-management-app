import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ModalTypes {
  ADD_BOARD = 'AddBoard',
  EDIT_BOARD = 'EditBoard',
  SHOW_BOARD = 'ShowBoard',
  DELETE = 'Delete',
}

const initialState = {
  open: false,
  data: {
    type: '' as ModalTypes,
    props: null as unknown | null,
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(_, action: PayloadAction<typeof initialState.data>) {
      return {
        open: true,
        data: action.payload,
      };
    },
    closeModal() {
      return initialState;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;