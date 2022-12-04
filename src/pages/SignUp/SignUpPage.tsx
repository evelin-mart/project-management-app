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
import { UserProfileFields, userForm } from 'constants/UserForm';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { isFulfilled } from '@reduxjs/toolkit';

export const SignUpPage = () => {
  const { data, isLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { t } = useTranslation();

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
    dispatch(createUser(data)).then((result) => {
      if (isFulfilled(result)) {
        enqueueSnackbar(t('snackbar-user-create'), { variant: 'success' });
        reset();
      }
    });
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
        {Object.values(UserProfileFields).map((key) => (
          <TextField
            key={key}
            {...register(key, {
              required: userForm[key].required ? ERRORS.required : false,
              minLength: {
                value: userForm[key].minLength,
                message: ERRORS.minLength(userForm[key].title, userForm[key].minLength),
              },
            })}
            fullWidth
            error={!!errors[key]}
            helperText={(errors[key]?.message as string) || ''}
            label={t(UserProfileFields[key])}
            margin="normal"
            type={key === UserProfileFields.password ? 'password' : 'text'}
            autoComplete={key === UserProfileFields.password ? 'current-password' : 'text'}
          />
        ))}
        <Box>
          <Button
            sx={{ my: 2 }}
            type="submit"
            form="form"
            variant="contained"
            color="secondary"
            disabled={isDirty && !!Object.keys(errors).length}
          >
            {t('signUp')}
          </Button>
        </Box>
        <Box sx={{ my: 2 }}>
          <Link to={`/${ROUTES.SIGN_IN}`}>
            {t('aha')} {t('signIn')}
          </Link>
        </Box>
      </Paper>
    </Loader>
  );
};
