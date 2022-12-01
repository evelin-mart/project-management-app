import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from 'store';
import { ItemTypes } from './ItemTypes';
import { IItemButtonAddTask } from './types';
import { ModalTypes, openModal } from 'store/modal';

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

  const handleAddTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(openModal({ type: ModalTypes.ADD_TASK, props: { columnId } }));
  };

  drop(ref);

  return (
    <div ref={ref} style={{ height: '50px' }}>
      <Button
        variant="outlined"
        style={{ backgroundColor: 'white', width: '96%' }}
        size="small"
        sx={{ my: 0.5, mx: 'auto' }}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
    </div>
  );
};
