import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from 'store';
import { setModal, setModalDataColumnId } from 'store/board';
import { ItemTypes } from './ItemTypes';
import { modalTypes } from 'components/Modal/modalTypes';
import { IItemButtonAddTask } from './types';

interface IButtonAddTask {
  columnId: string;
  addTaskInEmptyColumn: (item: IItemButtonAddTask, columnId: string) => void;
}

export const ButtonAddTask = ({ columnId, addTaskInEmptyColumn }: IButtonAddTask) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<IItemButtonAddTask>({
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    accept: ItemTypes.TASK,
    hover(item) {
      addTaskInEmptyColumn(item, columnId);
    },
  });

  drop(ref);

  return (
    <div ref={ref} style={{ height: '50px' }}>
      <Button
        variant="outlined"
        style={{ backgroundColor: 'white', width: '96%' }}
        size="small"
        sx={{ my: 0.5, mx: 'auto' }}
        onClick={() => {
          dispatch(setModalDataColumnId(columnId));
          dispatch(setModal(modalTypes.ADD_TASK));
        }}
      >
        Add Task
      </Button>
    </div>
  );
};
