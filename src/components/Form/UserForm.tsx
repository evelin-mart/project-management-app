import { useMediaQuery, Paper, Typography, TextField, Button } from '@mui/material';
import { useTheme, Box } from '@mui/system';
import { ERRORS } from 'constants/ValidationErrors';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'store';

export const UserForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Paper
      id="form"
      component="form"
      sx={{
        p: 3,
        maxWidth: '500px',
        width: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[100],
      }}
      noValidate
      autoComplete="off"
      //   onSubmit={handleSubmit(onUpdateSubmit)}
    >
      {/* <Typography
        variant={smUp ? 'h5' : 'h6'}
        align="center"
        sx={{ mb: '1rem', wordBreak: 'break-word' }}
      >
        My profile
      </Typography>
      <TextField
        {...register('name', {
          required: ERRORS.required,
          minLength: {
            value: 5,
            message: 'Name must have a minimum of 5 characters.',
          },
        })}
        fullWidth
        error={!!errors.name}
        helperText={(errors.name?.message as string) || ''}
        label="Name"
        margin="normal"
      />
      <TextField
        {...register('login', {
          required: ERRORS.required,
          minLength: {
            value: 5,
            message: 'Login must have a minimum of 5 characters.',
          },
        })}
        fullWidth
        error={!!errors.login}
        helperText={(errors.login?.message as string) || ''}
        label="Login"
        margin="normal"
      />
      <TextField
        {...register('password', {
          required: ERRORS.required,
          minLength: {
            value: 5,
            message: 'Passwords must have a minimum of 5 characters.',
          },
        })}
        fullWidth
        error={!!errors.password}
        helperText={(errors.password?.message as string) || ''}
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap-reverse',
        }}
      >
        <Button
          sx={{ mt: 2, mx: 1 }}
          form="form"
          variant="contained"
          color="error"
          onClick={() => setDeleteUserModal(true)}
        >
          Delete user
        </Button>
        <Button
          sx={{ mt: 2, mx: 1 }}
          type="submit"
          form="form"
          variant="contained"
          color="secondary"
          disabled={isDirty && !!Object.keys(errors).length}
        >
          Save
        </Button>
      </Box> */}
    </Paper>
  );
};
