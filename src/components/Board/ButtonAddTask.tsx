import { Button, Stack } from '@mui/material';
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from 'store';
import { ItemTypes } from './ItemTypes';
import { IItemButtonAddTask } from './types';
import { ModalTypes, openModal } from 'store/modal';
import { useTranslation } from 'react-i18next';

interface IButtonAddTask {
  columnId: string;
  addTaskInEmptyColumn: (item: IItemButtonAddTask, columnId: string) => void;
}

export const ButtonAddTask = ({ columnId, addTaskInEmptyColumn }: IButtonAddTask) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<IItemButtonAddTask>({
    accept: ItemTypes.TASK,
    hover(item) {
      addTaskInEmptyColumn(item, columnId);
    },
  });

  const handleAddTask = () =>
    dispatch(openModal({ type: ModalTypes.ADD_TASK, props: { columnId } }));

  drop(ref);

  return (
    <Stack ref={ref} style={{ flex: '0 0 50px', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        variant="outlined"
        style={{ backgroundColor: 'white', width: '96%' }}
        size="small"
        onClick={handleAddTask}
      >
        {t('addTask')}
      </Button>
    </Stack>
  );
};
