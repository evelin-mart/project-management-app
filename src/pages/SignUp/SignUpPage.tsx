import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ERRORS } from 'constants/ValidationErrors';
import { ROUTES } from 'constants/Routes';
import { createUser, selectUser } from 'store/user';
import { useAppDispatch, useAppSelector } from 'store';
import { Loader } from 'components/Loader';
import { useNavigate } from 'react-router';
import { SignUpQuery } from 'services/types/Auth.types';
import { Link } from 'react-router-dom';

export const SignUpPage = () => {
  const { data, isLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<SignUpQuery>();

  useEffect(() => {
    if (!isLoading && data.id) {
      navigate(`/${ROUTES.BOARDS}`);
    }
  }, [data.id, isLoading, navigate]);

  const onSubmit: SubmitHandler<SignUpQuery> = (data) => {
    dispatch(createUser(data));
    reset();
  };

  return (
    <Loader isLoading={isLoading}>
      <Paper
        id="form"
        component="form"
        sx={{
          p: 3,
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.grey[100],
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('name', { required: ERRORS.required })}
          fullWidth
          error={!!errors.name}
          helperText={(errors.name?.message as string) || ''}
          label="Name"
          margin="normal"
        />
        <TextField
          {...register('login', { required: ERRORS.required })}
          fullWidth
          error={!!errors.login}
          helperText={(errors.login?.message as string) || ''}
          label="Login"
          margin="normal"
        />
        <TextField
          {...register('password', { required: ERRORS.required })}
          fullWidth
          error={!!errors.password}
          helperText={(errors.password?.message as string) || ''}
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <Box>
          <Button
            sx={{ my: 2 }}
            type="submit"
            form="form"
            variant="contained"
            color="secondary"
            disabled={isDirty && !!Object.keys(errors).length}
          >
            Sign up
          </Button>
        </Box>
        <Box sx={{ my: 2 }}>
          <Link to={`/${ROUTES.SIGN_IN}`}>Already have an account? Sign In</Link>
        </Box>
      </Paper>
    </Loader>
  );
};
