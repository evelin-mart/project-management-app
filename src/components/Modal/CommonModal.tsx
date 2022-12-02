import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from 'store';
import { closeModal, ModalTypes } from '../../store/modal';
import { AddBoard } from './AddBoard';
import { EditBoard } from './EditBoard';
import { ConfirmDeletion } from './ConfirmDeletion';
import { ShowBoard } from './ShowBoard';
import { BoardData } from 'store/boards';
import { SubmitDeleteProps } from './ConfirmDeletion/ConfirmDeletion';
import { EditTask } from './EditTask';
import { EditTaskProps } from './EditTask/EditTask';
import { AddColumn } from './AddColumn';
import { AddTask } from './AddTask';
import { ShowTask } from './ShowTask';
import { TaskData } from 'services/types/Tasks.types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 3,
};

export const CommonModal = () => {
  const dispatch = useAppDispatch();
  const { open, data } = useAppSelector((store) => store.modal);

  const handleClose = () => dispatch(closeModal());

  let content: ReactNode;

  switch (data.type) {
    case ModalTypes.ADD_BOARD: {
      content = <AddBoard />;
      break;
    }
    case ModalTypes.EDIT_BOARD: {
      content = <EditBoard {...(data.props as { board: BoardData })} />;
      break;
    }
    case ModalTypes.SHOW_BOARD: {
      content = <ShowBoard {...(data.props as { board: BoardData })} />;
      break;
    }
    case ModalTypes.DELETE: {
      content = <ConfirmDeletion {...(data.props as SubmitDeleteProps)} />;
      break;
    }
    case ModalTypes.EDIT_TASK: {
      content = <EditTask {...(data.props as EditTaskProps)} />;
      break;
    }
    case ModalTypes.ADD_COLUMN: {
      content = <AddColumn />;
      break;
    }
    case ModalTypes.ADD_TASK: {
      content = <AddTask {...(data.props as { columnId: string })} />;
      break;
    }
    case ModalTypes.SHOW_TASK: {
      content = <ShowTask {...(data.props as { task: TaskData; user: string })} />;
      break;
    }
    default: {
      content = null;
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>{content}</Box>
    </Modal>
  );
};
