import { Box, Modal as MuiModal } from '@mui/material';
import React from 'react';

const styleModal = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '320px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const Modal = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={styleModal}>{children}</Box>
    </MuiModal>
  );
};
