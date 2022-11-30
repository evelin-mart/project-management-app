import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createTask, setModal } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';
import { modalTypes } from './modalTypes';

type FormValues = {
  title: string;
  description: string;
  userId: string;
};

export const AddTask = () => {
  const dispatch = useAppDispatch();
  const { users, modalData, board } = useAppSelector((state) => state.board);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      createTask({
        boardId: board.id,
        columnId: modalData.columnId,
        body: data,
      })
    );
    reset();
    dispatch(setModal(modalTypes.NONE));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" align="center">
        Add task
      </Typography>
      <TextField
        {...register('title', {
          required: 'Title is require field!',
        })}
        fullWidth
        error={!!errors.title}
        helperText={(errors.title?.message as string) || ''}
        label="Title"
        variant="outlined"
        margin="normal"
      />
      <TextField
        {...register('description', {
          required: 'Description is require field!',
        })}
        fullWidth
        error={!!errors.description}
        helperText={(errors.description?.message as string) || ''}
        label="Description"
        multiline
        maxRows={4}
      />
      <FormControl sx={{ my: 1.2 }} fullWidth size={'medium'}>
        <InputLabel>User</InputLabel>
        <Select
          defaultValue={'none'}
          label="User"
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

      <Button
        type="submit"
        variant="outlined"
        style={{ backgroundColor: 'white', height: '3rem', width: '100%' }}
        sx={{ mt: 2 }}
      >
        Add
      </Button>
    </form>
  );
};
