import React, { MouseEventHandler, useRef } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { updateMoveTask } from 'store/board';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import type { Identifier } from 'dnd-core';
import { useAppDispatch, useAppSelector } from 'store';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { IItemTaskDrop, ITaskComponent } from './types';
import { ModalTypes, openModal } from 'store/modal';
import { DeleteItems } from 'components/Modal/ConfirmDeletion/ConfirmDeletion';
import { useTranslation } from 'react-i18next';

const TaskStyle = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
  ...theme.typography.body2,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '95%',
  color: theme.palette.text.secondary,
}));

export const Task = ({ task, columnId, moveTask, index }: ITaskComponent) => {
  const id = task.id;
  const dispatch = useAppDispatch();
  const { users, board } = useAppSelector((state) => state.board);
  const { t } = useTranslation();

  const user = task?.userId ? users.find((user) => user.id === task.userId)?.name : 'None';

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

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      const taskId = task.id;
      return { id, index, columnId, taskId, task };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDeleteTask = () =>
    dispatch(
      openModal({
        type: ModalTypes.DELETE,
        props: { type: DeleteItems.TASK, args: { boardId: board.id, columnId, taskId: id } },
      })
    );

  const handleEditTask: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(
      openModal({
        type: ModalTypes.EDIT_TASK,
        props: { task, columnId },
      })
    );
  };

  const handleShowTask: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal({ type: ModalTypes.SHOW_TASK, props: { task, user } }));
  };

  const opacity = (canDrop && isOver) || isDragging ? 0 : 1;
  drag(drop(taskRef));

  return (
    <TaskStyle
      key={task.id}
      ref={taskRef}
      style={{ opacity, margin: '5px auto' }}
      data-handler-id={handlerId}
    >
      <CardHeader
        title={
          <Typography
            component="h2"
            variant="h5"
            color="textPrimary"
            sx={{ my: 0, wordBreak: 'break-all' }}
          >
            {task.title}
          </Typography>
        }
        disableTypography={true}
        action={
          <IconButton onClick={handleShowTask} title="Show details">
            <ManageSearchIcon />
          </IconButton>
        }
        sx={{ px: 2, py: 1 }}
      />
      <CardContent sx={{ px: 2, py: 0 }}>
        <Typography
          color="textPrimary"
          variant="subtitle1"
          sx={{
            my: 0,
            wordBreak: 'break-word',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            textAlign: 'start',
          }}
        >
          {task.description}
        </Typography>
      </CardContent>
      <Stack direction="row" justifyContent="space-between" sx={{ px: 2, py: 1, mt: 'auto' }}>
        <Typography color="textPrimary" variant="subtitle1" sx={{ py: 1, textAlign: 'start' }}>
          {t('user')}: {user}
        </Typography>
        <Box sx={{ flex: '0 0 80px', alignSelf: 'flex-end' }}>
          <IconButton aria-label="edit" onClick={handleEditTask}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteTask}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
    </TaskStyle>
  );
};
