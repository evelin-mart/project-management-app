import { Button, Card, Container, Grid, Stack, Typography, useTheme } from '@mui/material';
import { BoardItem } from 'components/BoardItem';
import { Loader } from 'components/Loader';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { ModalTypes, openModal } from '../../store/modal';
import { getBoards, selectBoards } from 'store/boards';

export const BoardsPage = () => {
  const { data, isLoading } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const HandleAddBoard = () => {
    dispatch(openModal({ type: ModalTypes.ADD_BOARD, props: null }));
  };

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <Loader isLoading={isLoading}>
      <Container sx={{ py: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          color={theme.palette.primary.main}
          marginBottom={2}
          textAlign="center"
        >
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
      </Container>
    </Loader>
  );
};
