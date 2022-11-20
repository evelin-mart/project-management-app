import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/Routes';

export const NotFoundPage = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 'auto',
      }}
    >
      <Typography fontSize={smUp ? '9rem' : '4rem'} fontWeight="700" align="center" color="error">
        404
      </Typography>
      <Typography sx={{ mx: 2, textAlign: 'center' }}>
        Oops! Page you are looking for hasn&apos;t been found. Would you like to get back to{' '}
        <Link to={ROUTES.HOME}>main page</Link>?
      </Typography>
    </Box>
  );
};
