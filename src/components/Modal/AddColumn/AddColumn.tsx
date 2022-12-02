import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createColumn } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';
import { closeModal } from 'store/modal';
import { useTranslation } from 'react-i18next';

type FormValues = {
  title: string;
};

export const AddColumn = () => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);
  const { t } = useTranslation();

  const handleClose = () => dispatch(closeModal());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(closeModal());
    dispatch(
      createColumn({
        boardId: board.id,
        body: data,
      })
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" align="center">
        {t('new-col')}
      </Typography>
      <TextField
        {...register('title', {
          required: 'Title is require field!',
        })}
        fullWidth
        error={!!errors.title}
        helperText={(errors.title?.message as string) || ''}
        label={t('title')}
        variant="outlined"
        margin="normal"
      />

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
