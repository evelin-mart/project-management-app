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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
