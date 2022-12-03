import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { useAppDispatch, useAppSelector } from 'store';
import { clearSnackbar } from 'store/snackbar';
import { useTranslation } from 'react-i18next';

export const useSnackbarConsumer = (snackbarProvider: SnackbarProvider | null) => {
  const { message, variant } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (message && snackbarProvider) {
      snackbarProvider.enqueueSnackbar(t(message), { variant });
      dispatch(clearSnackbar());
    }
  }, [message, dispatch, snackbarProvider, variant]);

  return null;
};
