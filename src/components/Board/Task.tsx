import React, { useRef } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { setModalDataTaskId, setModal, setModalDataColumnId } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';
import { ITaskService } from 'services/types/Tasks.types';
import { useDrag, useDrop } from 'react-dnd';

const TaskStyle = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
  ...theme.typography.body2,
  // marginBottom: theme.spacing(1),
  // marginTop: theme.spacing(1),
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '95%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Task = ({
  task,
  columnId,
  moveTask,
  index,
  id,
}: {
  task: ITaskService;
  columnId: string;
}) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.board);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId, isOver, canDrop }, drop] = useDrop({
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),
    accept: 'task',
    drop: (item, monitor) => {
      const dragIndex = id;
      console.log('drop', dragIndex, index);

      return { id: dragIndex };
    },

    hover(item, monitor) {
      moveTask(item, task.id);

      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: () => {
      console.log('columnId', columnId);
      const taskId = task.id;
      return { id, index, columnId, taskId };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // const colId = columns.find((column) => column.tasks.find((task) => task.id === item.id)).id;
      // console.log("item", item, dropResult, task.id, colId);
    },
    isDragging(monitor) {
      const columnId = monitor.getItem().columnId;
      const taskId = monitor.getItem().taskId;
      console.log('ii', monitor.getItem());

      return monitor.getItem().id === id;
    },
  });

  const opacity = canDrop && isOver ? 0 : 1;
  drag(drop(ref));

  return (
    <TaskStyle
      key={task.id}
      ref={ref}
      style={{ opacity, marginBottom: '15px' }}
      data-handler-id={handlerId}
    >
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
