import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'store';
import { addBoard } from 'store/boards';
import { closeModal } from 'store/modal';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { isFulfilled } from '@reduxjs/toolkit';

interface FormValues {
  title: string;
  description: string;
}

export const AddBoard = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(closeModal());
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>();

  const handleAddBoard: SubmitHandler<FormValues> = (data) => {
    dispatch(addBoard({ body: data })).then((result) => {
      if (isFulfilled(result)) {
        enqueueSnackbar(t('snackbar-board-create'), { variant: 'success' });
        handleClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(handleAddBoard)}>
      <Typography variant="h5" component="h2" align="center">
        {t('addBoard')}
      </Typography>
      <TextField
        {...register('title', {
          required: 'Title is required!',
        })}
        fullWidth
        label={t('title')}
        variant="outlined"
        margin="dense"
      />
      {errors?.title && (
        <Typography variant="body2" color="error">
          {errors.title.message}
        </Typography>
      )}

      <TextField
        {...register('description', {
          required: 'Description is required!',
        })}
        fullWidth
        label={t('desc')}
        multiline
        maxRows={4}
        margin="dense"
      />
      {errors?.description && (
        <Typography variant="body2" color="error">
          {errors.description.message}
        </Typography>
      )}

      <Stack direction="row" justifyContent="space-evenly" sx={{ pt: 3 }}>
        <Button variant="outlined" type="submit">
          {t('save')}
        </Button>
        <Button variant="outlined" color="error" onClick={handleClose}>
          {t('cancel')}
        </Button>
      </Stack>
    </form>
  );
};
