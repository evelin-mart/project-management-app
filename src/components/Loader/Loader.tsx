import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

export const Loader = () => {
  return (
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
  );
};
