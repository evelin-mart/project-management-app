import { Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { BoardItem } from 'components/BoardItem';
import { Loader } from 'components/Loader';
import { CommonModal } from 'components/Modal';
import { AddBoard } from 'components/Modal/AddBoard/AddBoard';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { openModal } from '../../store/modal';
import { getBoards, selectBoards } from 'store/boards';

export const BoardsPage = () => {
  const { data, isLoading, error } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const HandleAddBoard = () => {
    dispatch(openModal(<AddBoard />));
  };

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Typography variant="h3" component="h1" color={theme.palette.primary.main} marginBottom={2}>
        Boards
      </Typography>
      <Stack direction="row" gap={2} justifyContent="center" flexWrap="wrap">
        <Card sx={{ width: '200px' }}>
          <Button onClick={HandleAddBoard} sx={{ width: '100%', height: '100%' }}>
            + add board
          </Button>
        </Card>
        {data.map((board) => (
          <BoardItem board={board} key={board.id} />
        ))}
      </Stack>
      <CommonModal />
    </Loader>
  );
};
