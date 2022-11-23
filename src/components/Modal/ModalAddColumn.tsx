import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createColumn, setModal } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';

type FormValues = {
  title: string;
};

export const AddColumn = () => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      createColumn({
        boardId: board.id,
        body: data,
      })
    );
    reset();
    dispatch(setModal(''));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" align="center">
        New column
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
      {errors?.title && <div style={{ color: 'red' }}>title is invalid</div>}

      <Button
        variant="outlined"
        type="submit"
        style={{ backgroundColor: 'white', height: '3rem', width: '100%' }}
        sx={{ mt: 2 }}
      >
        Add
      </Button>
    </form>
  );
};
