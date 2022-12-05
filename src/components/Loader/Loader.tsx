import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container } from '@mui/material';

export const Loader = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </Container>
  );
};
