import React, { MouseEventHandler, useRef } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { updateMoveTask } from 'store/board';
import type { Identifier } from 'dnd-core';
import { useAppDispatch, useAppSelector } from 'store';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { IItemTaskDrop, ITaskComponent } from './types';
import { ModalTypes, openModal } from 'store/modal';
import { DeleteItems } from 'components/Modal/ConfirmDeletion/ConfirmDeletion';

const TaskStyle = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
  ...theme.typography.body2,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '95%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Task = ({ task, columnId, moveTask, index }: ITaskComponent) => {
  const id = task.id;
  const dispatch = useAppDispatch();
  const { users, board } = useAppSelector((state) => state.board);

  const taskRef = useRef<HTMLDivElement>(null);
  const [{ handlerId, isOver, canDrop }, drop] = useDrop<
    IItemTaskDrop,
    void,
    { handlerId: Identifier | null; isOver: boolean; canDrop: boolean }
  >({
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),
    accept: ItemTypes.TASK,
    drop: (item) => {
      dispatch(
        updateMoveTask({
          boardId: board.id,
          columnId: item.columnId,
          taskId: item.taskId,
          body: {
            title: item.task.title,
            description: item.task.description,
            userId: item.task.userId,
            columnId: columnId,
            boardId: board.id,
            order: index + 1,
          },
        })
      );
    },

    hover(item) {
      moveTask(item, task.id);
      item.index = index;
    },
  });

  const [, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      const taskId = task.id;
      return { id, index, columnId, taskId, task };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  });

  const handleDeleteTask: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(
      openModal({
        type: ModalTypes.DELETE,
        props: { id: board.id, type: DeleteItems.TASK, idColumn: columnId, idTask: task.id },
      })
    );
  };

  const handleEditTask: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(
      openModal({
        type: ModalTypes.EDIT_TASK,
        props: { task, columnId },
      })
    );
  };

  const opacity = canDrop && isOver ? 0 : 1;
  drag(drop(taskRef));

  return (
    <TaskStyle
      key={task.id}
      ref={taskRef}
      style={{ opacity, marginBottom: '15px' }}
      data-handler-id={handlerId}
    >
      <Typography color="textPrimary" variant="h5" component="h2" sx={{ my: 0 }}>
        {task.title}
      </Typography>
      <Typography
        color="textPrimary"
        variant="subtitle1"
        sx={{
          my: 0,
          wordBreak: 'break-all',
          p: '5px',
          maxHeight: '100px',
          overflow: 'hidden',
          textOverflow: 'clip',
        }}
      >
        {task.description}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginLeft: '1rem' }}>
          User: {task?.userId ? users.find((user) => user.id === task.userId)?.name : 'None'}
        </div>
        <div>
          <IconButton aria-label="edit" onClick={handleEditTask}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteTask}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </TaskStyle>
  );
};
