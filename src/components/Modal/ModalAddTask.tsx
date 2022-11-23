import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createTask, setModal } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';

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
    dispatch(setModal(''));
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
        label="Title"
        variant="outlined"
        margin="normal"
      />
      {errors?.title && <div style={{ color: 'red' }}>Title is invalid</div>}
      <TextField
        {...register('description', {
          required: 'Description is require field!',
        })}
        fullWidth
        label="Description"
        multiline
        maxRows={4}
      />
      {errors?.description && <div style={{ color: 'red' }}>Description is invalid</div>}
      <FormControl sx={{ my: 1.2, minWidth: 335 }} size={'medium'}>
        <InputLabel>User</InputLabel>
        <Select
          label="User"
          {...register('userId', {
            required: 'userId is require field!',
          })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.login}
            </MenuItem>
          ))}
        </Select>
        {errors?.userId && <div style={{ color: 'red' }}>userId is invalid</div>}
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
