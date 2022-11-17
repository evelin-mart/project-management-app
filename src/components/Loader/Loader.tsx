import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

export const Loader = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  return isLoading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        aligntItems: 'center',
        margin: 'auto',
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>{children}</>
  );
};
