import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createTask } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';
import { closeModal } from 'store/modal';
import { useTranslation } from 'react-i18next';

type FormValues = {
  title: string;
  description: string;
  userId: string;
};

export const AddTask = ({ columnId }: { columnId: string }) => {
  const dispatch = useAppDispatch();
  const { users, board } = useAppSelector((state) => state.board);
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
      createTask({
        boardId: board.id,
        columnId: columnId,
        body: data,
      })
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" align="center">
        {t('addTask')}
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
        margin="dense"
      />
      <TextField
        {...register('description', {
          required: 'Description is require field!',
        })}
        fullWidth
        error={!!errors.description}
        helperText={(errors.description?.message as string) || ''}
        label={t('desc')}
        multiline
        maxRows={4}
        margin="dense"
      />
      <FormControl sx={{ my: 1.2 }} fullWidth size={'medium'}>
        <InputLabel>User</InputLabel>
        <Select
          defaultValue={'none'}
          label={t('user')}
          error={!!errors.userId}
          {...register('userId', {
            required: 'User is require field!',
            pattern: {
              value: /[^none]/,
              message: 'User is require field!',
            },
          })}
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.login}
            </MenuItem>
          ))}
        </Select>
        {errors?.userId && (
          <div style={{ color: '#fe6b61', margin: '3px 15px' }}>{errors.userId.message}</div>
        )}
      </FormControl>

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
