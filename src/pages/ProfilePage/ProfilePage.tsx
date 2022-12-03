import React, { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ERRORS } from 'constants/ValidationErrors';
import { selectUser, updateUser } from 'store/user';
import { useAppDispatch, useAppSelector } from 'store';
import { Loader } from 'components/Loader';
import { UpdateUserRequest } from 'services/types/Users.types';
import { UserProfileFields, userForm } from 'constants/UserForm';
import { ModalTypes, openModal } from 'store/modal';
import { DeleteItems } from 'components/Modal/ConfirmDeletion/ConfirmDeletion';
import { useTranslation } from 'react-i18next';
import { isFulfilled } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

export const ProfilePage = () => {
  const { data, isLoading } = useAppSelector(selectUser);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<UpdateUserRequest>({
    defaultValues: useMemo(() => {
      return { name: data.name, login: data.login };
    }, [data]),
  });

  useEffect(() => {
    reset({ name: data.name, login: data.login });
  }, [data, reset]);

  const onUpdateSubmit: SubmitHandler<UpdateUserRequest> = (data) => {
    dispatch(updateUser(data)).then((result) => {
      if (isFulfilled(result)) {
        enqueueSnackbar(t('snackbar-user-change'), { variant: 'success' });
        reset();
      }
    });
  };

  const handleDeleteUser = () =>
    dispatch(
      openModal({
        type: ModalTypes.DELETE,
        props: { type: DeleteItems.USER, args: { id: data.id } },
      })
    );

  return (
    <Loader isLoading={isLoading}>
      <Paper
        id="form"
        component="form"
        sx={{
          p: 3,
          m: 'auto',
          maxWidth: '500px',
          width: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.grey[100],
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onUpdateSubmit)}
      >
        <Typography
          variant={smUp ? 'h5' : 'h6'}
          align="center"
          sx={{ mb: '1rem', wordBreak: 'break-word' }}
        >
          {t('profile')}
        </Typography>
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
            onClick={handleDeleteUser}
          >
            {t('del')} {t('user-del')}
          </Button>
          <Button
            sx={{ mt: 2, mx: 1 }}
            type="submit"
            form="form"
            variant="contained"
            color="secondary"
            disabled={isDirty && !!Object.keys(errors).length}
          >
            {t('save')}
          </Button>
        </Box>
      </Paper>
    </Loader>
  );
};
