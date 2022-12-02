import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VariantType } from 'notistack';

const initialState: { message?: string; variant?: VariantType } = {};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar(_, action: PayloadAction<{ message?: string; variant: VariantType }>) {
      return {
        message: action?.payload?.message,
        variant: action?.payload?.variant,
      };
    },
    clearSnackbar() {
      return {};
    },
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;
