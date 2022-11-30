import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateTask, setModal } from 'store/board';
import { User } from 'services/types/Users.types';
import { useAppDispatch, useAppSelector } from 'store';
import { modalTypes } from './modalTypes';

interface FormValues {
  title: string;
  description: string;
  userId: string;
}

export const EditTask = () => {
  const dispatch = useAppDispatch();
  const { users, modalData, board, editTask } = useAppSelector((state) => state.board);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const task = board.columns
      .find((item) => item.id === modalData.columnId)
      ?.tasks.find((item) => item.id === modalData.taskId);

    dispatch(
      updateTask({
        boardId: board.id,
        columnId: modalData.columnId,
        taskId: modalData.taskId,
        body: {
          boardId: board.id,
          columnId: modalData.columnId,
          order: task?.order || 1,
          // order: 1,
          ...data,
        },
      })
    );
    reset();
    dispatch(setModal(modalTypes.NONE));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" align="center">
        Edit task
      </Typography>
      <TextField
        {...register('title', {
          required: 'Title is require field!',
        })}
        fullWidth
        error={!!errors.title}
        helperText={(errors.title?.message as string) || ''}
        defaultValue={editTask?.title}
        label="Title"
        variant="outlined"
        margin="normal"
      />
      <TextField
        {...register('description', {
          required: 'Title is require field!',
        })}
        fullWidth
        error={!!errors.description}
        helperText={(errors.description?.message as string) || ''}
        label="Description"
        defaultValue={editTask?.description}
        multiline
        maxRows={4}
      />
      <FormControl sx={{ my: 1.2 }} fullWidth size={'medium'}>
        <InputLabel>User</InputLabel>
        <Select
          defaultValue={editTask?.userId}
          error={!!errors.userId}
          label="User"
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
      <Button
        variant="outlined"
        type="submit"
        style={{ backgroundColor: 'white', height: '3rem', width: '100%' }}
        sx={{ mt: 2 }}
      >
        Edit
      </Button>
    </form>
  );
};
