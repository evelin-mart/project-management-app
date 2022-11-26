import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'store';
import { closeModal } from 'store/modal';
import { deleteBoard } from 'store/boards';

export enum DeleteItems {
  BOARD = 'board',
  COLUMN = 'column',
  TASK = 'task',
}

export interface SubmitDeleteProps {
  id: string;
  type: DeleteItems;
}

export const ConfirmDeletion = ({ id, type }: SubmitDeleteProps) => {
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
