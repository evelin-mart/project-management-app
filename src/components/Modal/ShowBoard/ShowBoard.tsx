import React from 'react';
import { Typography } from '@mui/material';
import { BoardData } from 'store/boards';

export const ShowBoard = ({ board }: { board: BoardData }) => (
  <>
    <Typography variant="h5" align="center">
      {board.title}
    </Typography>
    <Typography
      variant="body1"
      sx={{ maxHeight: '400px', overflowY: 'auto', overflowWrap: 'break-word', mt: 2 }}
    >
      {board.description}
    </Typography>
  </>
);
