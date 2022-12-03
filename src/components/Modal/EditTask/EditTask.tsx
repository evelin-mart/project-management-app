import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateTask } from 'store/board';
import { User } from 'services/types/Users.types';
import { useAppDispatch, useAppSelector } from 'store';
import { closeModal } from 'store/modal';
import { useTranslation } from 'react-i18next';

interface FormValues {
  title: string;
  description: string;
  userId: string;
}

export interface EditTaskProps {
  columnId: string;
  task: {
    id: string;
    title: string;
    description: string;
    userId: string;
    order: number;
  };
}

export const EditTask = ({ task, columnId }: EditTaskProps) => {
  const dispatch = useAppDispatch();
  const { users, board } = useAppSelector((state) => state.board);
  const { t } = useTranslation();

  const handleClose = () => dispatch(closeModal());

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(closeModal());
    dispatch(
      updateTask({
        boardId: board.id,
        columnId: columnId,
        taskId: task.id,
        body: {
          boardId: board.id,
          columnId: columnId,
          order: task?.order || 1,
          ...data,
        },
      })
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" align="center">
        {t('edit')} {t('task-del')}
      </Typography>
      <TextField
        {...register('title', {
          required: 'Title is require field!',
        })}
        fullWidth
        error={!!errors.title}
        helperText={(errors.title?.message as string) || ''}
        defaultValue={task?.title}
        label={t('title')}
        variant="outlined"
        margin="dense"
      />
      <TextField
        {...register('description', {
          required: 'Title is require field!',
        })}
        fullWidth
        error={!!errors.description}
        helperText={(errors.description?.message as string) || ''}
        label={t('desc')}
        defaultValue={task?.description}
        multiline
        maxRows={4}
        margin="dense"
      />
      <FormControl sx={{ my: 1.2 }} fullWidth size={'medium'}>
        <InputLabel>User</InputLabel>
        <Select
          defaultValue={task?.userId}
          error={!!errors.userId}
          label={t('user')}
          {...register('userId', {
            required: 'userId is require field!',
          })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users.map((user: User) => (
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
