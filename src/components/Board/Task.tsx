import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { setModalDataTaskId, setModal, setModalDataColumnId } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';
import { ITaskService } from 'services/types/Tasks.types';

const TaskStyle = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
  ...theme.typography.body2,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '95%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Task = ({ task, columnId }: { task: ITaskService; columnId: string }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.board);

  return (
    <TaskStyle key={task.id}>
      <Typography color="textPrimary" variant="h5" component="h2" sx={{ my: 0 }}>
        {task.title}
      </Typography>
      <Typography color="textPrimary" variant="subtitle1" sx={{ my: 0 }}>
        order: {task.order}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginLeft: '1rem' }}>
          User: {task?.userId ? users.find((user) => user.id === task.userId)?.name : 'None'}
        </div>
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => {
              dispatch(setModal('EditTask'));
              dispatch(setModalDataColumnId(columnId));
              dispatch(setModalDataTaskId(task.id));
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              dispatch(setModal('DelTask'));
              dispatch(setModalDataColumnId(columnId));
              dispatch(setModalDataTaskId(task.id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </TaskStyle>
  );
};
