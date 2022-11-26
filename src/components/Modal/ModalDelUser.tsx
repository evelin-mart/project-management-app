import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'store';
import { deleteUser } from 'store/user';
import { ROUTES } from 'constants/Routes';
import { useNavigate } from 'react-router';
import { Modal } from './Modal';
import { Box } from '@mui/system';

export const DelUser = ({ onClose, open }: { onClose: () => void; open: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    dispatch(deleteUser());
    onClose();
    navigate(`/${ROUTES.SIGN_UP}`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" component="h2" align="center">
        Are you sure you want to delete this profile?
      </Typography>
      <Button
        variant="outlined"
        style={{ backgroundColor: 'white', height: '3rem', width: '100%' }}
        sx={{ mt: 2 }}
        onClick={onConfirm}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        style={{ backgroundColor: 'white', height: '3rem', width: '100%' }}
        sx={{ mt: 2 }}
        onClick={onClose}
      >
        Cancel
      </Button>
    </Modal>
  );
};
