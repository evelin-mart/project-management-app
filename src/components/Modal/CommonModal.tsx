import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from 'store';
import { closeModal } from '../../store/modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const CommonModal = () => {
  const dispatch = useAppDispatch();
  const { open, content } = useAppSelector((store) => store.modal);

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal hideBackdrop open={open} onClose={handleClose}>
      <Box sx={style}>{content}</Box>
    </Modal>
  );
};
