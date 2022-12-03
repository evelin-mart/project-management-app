import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'store';
import { closeModal } from 'store/modal';
import { deleteBoard } from 'store/boards';
import { useTranslation } from 'react-i18next';
import { deleteColumn, deleteTask } from 'store/board';
import { deleteBoardRequest } from 'services/types/Board.types';
import { DeleteUserRequest } from 'services/types/Users.types';
import { deleteColumnRequest } from 'services/types/Columns.types';
import { deleteTaskRequest } from 'services/types/Tasks.types';
import { deleteUser, logout } from 'store/user';
import { useSnackbar } from 'notistack';
import { isFulfilled } from '@reduxjs/toolkit';

export enum DeleteItems {
  BOARD = 'board',
  COLUMN = 'column',
  TASK = 'task',
  USER = 'user',
}

export interface SubmitDeleteProps {
  type: DeleteItems;
  args: {
    [x: string]: string;
  };
}

export const ConfirmDeletion = ({ type, args }: SubmitDeleteProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(closeModal());
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = () => {
    let apiAction: () => Promise<unknown>;
    switch (type) {
      case DeleteItems.BOARD: {
        apiAction = () => dispatch(deleteBoard({ ...args } as deleteBoardRequest));
        break;
      }
      case DeleteItems.COLUMN: {
        apiAction = () => dispatch(deleteColumn({ ...args } as deleteColumnRequest));
        break;
      }
      case DeleteItems.TASK: {
        apiAction = () => dispatch(deleteTask({ ...args } as deleteTaskRequest));
        break;
      }
      case DeleteItems.USER: {
        apiAction = async () => {
          return dispatch(deleteUser({ ...args } as DeleteUserRequest)).then((result) => {
            if (isFulfilled(result)) {
              dispatch(logout());
            }
            return result;
          });
        };
        break;
      }
      default: {
        apiAction = () => Promise.resolve();
      }
    }
    return apiAction().then((result) => {
      if (isFulfilled(result)) {
        dispatch(closeModal());
        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
        enqueueSnackbar(`${capitalizedType} has been deleted successfully`, { variant: 'info' });
      }
    });
  };

  const handleSubmit = () => {
    onSubmit().then(() => dispatch(closeModal()));
  };

  return (
    <>
      <Typography variant="h5" component="h2" align="center">
        {t('confirmation')} {t(type)}?
      </Typography>
      <Stack direction="row" justifyContent="space-evenly" sx={{ pt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button variant="outlined" color="error" onClick={handleSubmit}>
          {t('del')}
        </Button>
      </Stack>
    </>
  );
};
