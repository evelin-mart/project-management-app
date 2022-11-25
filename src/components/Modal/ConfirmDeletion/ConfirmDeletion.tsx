import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'store';
import { closeModal } from 'store/modal';

export const ConfirmDeletion = ({
  onSubmit,
  type,
}: {
  onSubmit: () => void;
  type: 'board' | 'column' | 'task';
}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeModal());

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
