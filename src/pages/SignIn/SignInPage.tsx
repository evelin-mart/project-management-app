import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ERRORS } from 'constants/ValidationErrors';
import { ROUTES } from 'constants/Routes';
import { selectUser, authorizeUser } from 'store/user';
import { useAppDispatch, useAppSelector } from 'store';
import { Loader } from 'components/Loader';
import { useNavigate } from 'react-router';
import { SignInQuery } from 'services/types/Auth.types';
import { Link } from 'react-router-dom';

export const SignInPage = () => {
  const { data, isLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<SignInQuery>();

  useEffect(() => {
    if (!isLoading && data.id) {
      navigate(`/${ROUTES.BOARDS}`);
    }
  }, [data.id, isLoading, navigate]);

  const onSubmit: SubmitHandler<SignInQuery> = (data) => {
    dispatch(authorizeUser(data));
    reset();
  };

  return (
    <Loader isLoading={isLoading}>
      <Paper
        id="form"
        component="form"
        sx={{
          p: 3,
          maxWidth: '400px',
          width: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 'auto',
          backgroundColor: theme.palette.grey[100],
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            Sign in
          </Button>
        </Box>
        <Box sx={{ my: 2 }}>
          <Link to={`/${ROUTES.SIGN_UP}`}>Don&#39;t have an account? Sign Up</Link>
        </Box>
      </Paper>
    </Loader>
  );
};
