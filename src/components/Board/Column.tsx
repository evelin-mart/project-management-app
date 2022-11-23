import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Task } from './Task';
import {
  updateColumnTitle,
  setModal,
  setModalDataColumnId,
  setEditTitleColumnId,
} from 'store/board';
import DeleteIcon from '@mui/icons-material/Delete';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ITaskService } from 'services/types/Tasks.types';
import { ColumnData } from 'services/types/Columns.types';
import { useAppDispatch, useAppSelector } from 'store';

const ColumnStyle = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#e7ebf0' : '#e7ebf0',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  margin: theme.spacing(1),
  height: 'content',
  width: '350px',
  textAlign: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,
}));

type FormValues = {
  title: string;
};

export const Column = ({ column }: { column: ColumnData }) => {
  const dispatch = useAppDispatch();
  const { editTitleColumnId, board } = useAppSelector((state) => state.board);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      updateColumnTitle({
        boardId: board.id,
        columnId: column.id,
        body: { title: data.title, order: column.order },
      })
    );

    reset();
    dispatch(setEditTitleColumnId(''));
  };

  return (
    <ColumnStyle key={column.id}>
      <Grid container sx={{ overflowY: 'auto', maxHeight: '80vh', overflowX: 'hidden' }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '345px' }}
            >
              {!(column.id === editTitleColumnId) && (
                <Typography
                  color="textPrimary"
                  variant="h4"
                  component="h2"
                  textAlign="start"
                  onClick={() => dispatch(setEditTitleColumnId(column.id))}
                  sx={{ ml: 1.5 }}
                >
                  {column.title}
                </Typography>
              )}
              {column.id === editTitleColumnId && (
                <TextField
                  {...register('title', {
                    required: 'Title is require field!',
                  })}
                  label=""
                  variant="outlined"
                  defaultValue={column.title}
                  size="small"
                  sx={{ ml: 1.2, mt: 1, width: '270px' }}
                />
              )}
              {errors?.title && <div style={{ color: 'red' }}>title is invalid</div>}
              <IconButton
                aria-label="delete"
                sx={{ mt: 1 }}
                onClick={() => {
                  dispatch(setModal('DelColumn'));
                  dispatch(setModalDataColumnId(column.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            {column.id === editTitleColumnId && (
              <>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ width: '45%', mt: 1, ml: 1.2, mr: 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: '45%', mt: 1, mr: 1.2 }}
                  onClick={() => dispatch(setEditTitleColumnId(''))}
                >
                  Cancel
                </Button>
              </>
            )}
          </form>
        </Grid>
        <Grid
          container
          component="div"
          sx={{
            height: 'content',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {column.tasks.map((task: ITaskService) => (
            <Task key={task.id} task={task} columnId={column.id} />
          ))}
          <Button
            variant="outlined"
            style={{ backgroundColor: 'white', width: '96%' }}
            size="small"
            sx={{ my: 0.5, mx: 'auto' }}
            onClick={() => {
              dispatch(setModalDataColumnId(column.id));
              dispatch(setModal('addTask'));
            }}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </ColumnStyle>
  );
};
