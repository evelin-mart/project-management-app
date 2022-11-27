import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'store';
import { BoardData, updateBoard } from 'store/boards';
import { closeModal } from 'store/modal';
import { useTranslation } from 'react-i18next';

interface FormValues {
  title: string;
  description: string;
}

export const EditBoard = ({ board }: { board: BoardData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(closeModal());

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>();

  const handleBoardUpdate: SubmitHandler<FormValues> = (data) => {
    dispatch(
      updateBoard({
        boardId: board.id,
        body: data,
      })
    ).then(() => handleClose());
  };

  return (
    <form onSubmit={handleSubmit(handleBoardUpdate)}>
      <Typography variant="h5" component="h2" align="center">
        {t('edit')} {t('board-del')}
      </Typography>
      <TextField
        {...register('title', {
          required: 'Title is required!',
        })}
        fullWidth
        label={t('title')}
        variant="outlined"
        margin="normal"
        defaultValue={board.title}
        sx={{ mb: 2 }}
      />
      {errors?.title && (
        <Typography variant="body2" sx={{ color: 'red' }}>
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
        defaultValue={board.description}
      />
      {errors?.description && (
        <Typography variant="body2" sx={{ color: 'red' }}>
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
