import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'store';
import { closeModal } from 'store/modal';
import { deleteBoard } from 'store/boards';
import { ROUTES } from 'constants/Routes';
import { useNavigate } from 'react-router';
import { deleteUser, logout } from 'store/user';

export enum DeleteItems {
  BOARD = 'board',
  COLUMN = 'column',
  TASK = 'task',
  USER = 'user',
}

export interface SubmitDeleteProps {
  id: string;
  type: DeleteItems;
}

export const ConfirmDeletion = ({ id, type }: SubmitDeleteProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeModal());

  let onSubmit: () => void;

  switch (type) {
    case DeleteItems.BOARD: {
      onSubmit = () => dispatch(deleteBoard(id)).then(() => dispatch(closeModal()));
      break;
    }
    case DeleteItems.COLUMN: {
      onSubmit = () => {};
      break;
    }
    case DeleteItems.TASK: {
      onSubmit = () => {};
      break;
    }
    case DeleteItems.USER: {
      onSubmit = async () => {
        await dispatch(deleteUser());
        dispatch(closeModal());
        logout();
        navigate(`/${ROUTES.SIGN_UP}`);
      };
      break;
    }
    default: {
      onSubmit = () => {};
    }
  }

  return (
    <>
      <Typography variant="h5" component="h2" align="center">
        Are you sure want to delete {type}?
      </Typography>
      <Stack direction="row" justifyContent="space-evenly" sx={{ pt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={onSubmit}>
          Delete
        </Button>
      </Stack>
    </>
  );
};
