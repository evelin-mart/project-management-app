import { Button, Grid, Typography } from '@mui/material';
import { BoardItem } from 'components/BoardItem';
import { Loader } from 'components/Loader';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { selectBoards } from 'store/boards';

export const BoardsPage = () => {
  const { data, isLoading, error } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addBoard = () => {};

  useEffect(() => {}, []);

  return (
    <Loader isLoading={isLoading}>
      <Typography variant="h1" component="h1">
        Boards
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 4 }}>
        {data.map((board) => (
          <BoardItem board={board} key={board.id} />
        ))}
        <Button onClick={addBoard}>+ add board</Button>
      </Grid>
    </Loader>
  );
};
