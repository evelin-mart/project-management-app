import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteColumn, setModal } from 'store/board';
import { useAppDispatch, useAppSelector } from 'store';

export const DelColumn = () => {
  const { modalData, board } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h5" component="h2" align="center">
        Delete column?
      </Typography>
      <Button
        variant="outlined"
        style={{ backgroundColor: 'white', height: '3rem', width: '100%' }}
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(
            deleteColumn({
              boardId: board.id,
              columnId: modalData.columnId,
            })
          );
          dispatch(setModal(''));
        }}
      >
        Yes
      </Button>
      <Button
        variant="outlined"
        style={{ backgroundColor: 'white', height: '3rem', width: '100%' }}
        sx={{ mt: 2 }}
        onClick={() => dispatch(setModal(''))}
      >
        Cancel
      </Button>
    </>
  );
};
