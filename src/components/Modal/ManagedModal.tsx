import { Box, Modal } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { setModal } from 'store/board';
import { AddColumn } from './ModalAddColumn';
import { AddTask } from './ModalAddTask';
import { DelColumn } from './ModalDelColumn';
import { DelTask } from './ModalDelTask';
import { EditTask } from './ModalEditTask';

const styleModal = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const ManagedModal = () => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.board);

  return (
    <Modal open={true} onClose={() => dispatch(setModal(''))}>
      <Box sx={styleModal}>
        {modal === 'addTask' && <AddTask />}
        {modal === 'EditTask' && <EditTask />}
        {modal === 'DelTask' && <DelTask />}
        {modal === 'AddColumn' && <AddColumn />}
        {modal === 'DelColumn' && <DelColumn />}
      </Box>
    </Modal>
  );
};
