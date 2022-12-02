import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { useAppDispatch, useAppSelector } from 'store';
import { clearSnackbar } from 'store/snackbar';

export const useSnackbarConsumer = (snackbarProvider: SnackbarProvider | null) => {
  const { message, variant } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message && snackbarProvider) {
      snackbarProvider.enqueueSnackbar(message, { variant });
      dispatch(clearSnackbar());
    }
  }, [message, dispatch, snackbarProvider, variant]);

  return null;
};
