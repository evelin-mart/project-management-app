import React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { setModal } from 'store/board';
import { AddColumn } from './ModalAddColumn';
import { AddTask } from './ModalAddTask';
import { DelColumn } from './ModalDelColumn';
import { DelTask } from './ModalDelTask';
import { EditTask } from './ModalEditTask';
import { Modal } from './Modal';

export const ManagedModal = () => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.board);

  return (
    <Modal open={true} onClose={() => dispatch(setModal(''))}>
      {modal === 'addTask' && <AddTask />}
      {modal === 'EditTask' && <EditTask />}
      {modal === 'DelTask' && <DelTask />}
      {modal === 'AddColumn' && <AddColumn />}
      {modal === 'DelColumn' && <DelColumn />}
    </Modal>
  );
};
