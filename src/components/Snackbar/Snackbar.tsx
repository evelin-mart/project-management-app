import React, { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useSnackbarConsumer } from './SnackbarConsumer';

export const Snackbar = ({ children }: { children: ReactNode }) => {
  const snackbarRef = React.useRef<SnackbarProvider>(null);
  useSnackbarConsumer(snackbarRef.current);

  return (
    <SnackbarProvider
      ref={snackbarRef}
      maxSnack={3}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={(snackbarId) => (
        <IconButton
          aria-label="close"
          sx={{ color: 'white' }}
          onClick={() => snackbarRef.current?.closeSnackbar(snackbarId)}
        >
          <CloseIcon />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};
