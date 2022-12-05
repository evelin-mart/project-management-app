import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { useRef } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import type { Identifier } from 'dnd-core';
import { Task } from './Task';
import { updateColumnTitle, setEditTitleColumnId, updateMoveColumn } from 'store/board';
import DeleteIcon from '@mui/icons-material/Delete';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ITaskService } from 'services/types/Tasks.types';
import { useAppDispatch, useAppSelector } from 'store';
import { useDrag, useDrop } from 'react-dnd';
import { ButtonAddTask } from './ButtonAddTask';
import { ItemTypes } from './ItemTypes';
import { IColumnComponent, IItemColumnDrop } from './types';
import { ModalTypes, openModal } from 'store/modal';
import { DeleteItems } from 'components/Modal/ConfirmDeletion/ConfirmDeletion';
import { useTranslation } from 'react-i18next';

const ColumnStyle = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#e7ebf0' : '#e7ebf0',
  ...theme.typography.body2,
  boxShadow: '30 30 30 30 rgba(9,30,66,.25)',
  height: 'content',
  width: '310px',
  textAlign: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  cursor: 'move',
}));

type FormValues = {
  title: string;
};

export const Column = ({
  index,
  id,
  column,
  moveColumn,
  moveTask,
  addTaskInEmptyColumn,
}: IColumnComponent) => {
  const dispatch = useAppDispatch();
  const { editTitleColumnId, board } = useAppSelector((state) => state.board);
  const { t } = useTranslation();
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

  const columnRef = useRef<HTMLDivElement>(null);

  const task = column.tasks.length > 0 ? column.tasks.slice() : [];
  if (column.tasks.length > 0) {
    task.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  }

  const [{ handlerId }, drop] = useDrop<
    IItemColumnDrop,
    { columnId: string },
    { handlerId: Identifier | null }
  >({
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    accept: ItemTypes.COLUMN,
    drop() {
      return { columnId: column.id };
    },

    hover(item) {
      moveColumn(item);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => {
      return { id, index, column };
    },
    end: (item) => {
      dispatch(
        updateMoveColumn({
          columnId: item.id,
          boardId: board.id,
          body: {
            order: item.index + 1,
            title: item.column.title,
          },
        })
      );
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(columnRef));

  const handleDeleteColumn = () =>
    dispatch(
      openModal({
        type: ModalTypes.DELETE,
        props: { type: DeleteItems.COLUMN, args: { boardId: board.id, columnId: column.id } },
      })
    );

  return (
    <Box ref={columnRef} style={{ opacity, margin: '5px' }} data-handler-id={handlerId}>
      <ColumnStyle key={column.id}>
        <Grid container sx={{ overflowX: 'hidden' }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
            <Paper
              component="form"
              sx={{ width: '100%', mb: '5px' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                {!(column.id === editTitleColumnId) && (
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    component="h3"
                    textAlign="start"
                    onClick={() => dispatch(setEditTitleColumnId(column.id))}
                    sx={{
                      px: 1,
                      cursor: 'text',
                      overflow: 'hidden',
                      maxWidth: '80%',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
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
                    autoFocus
                    helperText={(errors.title?.message as string) || ''}
                    error={!!errors.title}
                    variant="outlined"
                    defaultValue={column.title}
                    size="small"
                    sx={{ ml: 1.2, mt: 1, width: '245px' }}
                  />
                )}
                <IconButton aria-label="delete" sx={{ mt: 1 }} onClick={handleDeleteColumn}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              {column.id === editTitleColumnId && (
                <>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ width: '45%', mt: 1, ml: 1.2, mr: 1, mb: 1 }}
                  >
                    {t('save')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: '45%', mt: 1, mr: 1.2, mb: 1 }}
                    onClick={() => dispatch(setEditTitleColumnId(''))}
                  >
                    {t('cancel')}
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
          <Grid
            container
            component="div"
            direction="column"
            sx={{
              maxHeight: 'calc(100vh - 255px)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            {task.map((task: ITaskService, i: number) => (
              <Task key={task.id} task={task} index={i} columnId={column.id} moveTask={moveTask} />
            ))}
            <ButtonAddTask columnId={column.id} addTaskInEmptyColumn={addTaskInEmptyColumn} />
          </Grid>
        </Grid>
      </ColumnStyle>
    </Box>
  );
};
