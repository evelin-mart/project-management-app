import { Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { BoardItem } from 'components/BoardItem';
import { Loader } from 'components/Loader';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { ModalTypes, openModal } from '../../store/modal';
import { getBoards, selectBoards } from 'store/boards';
import { useTranslation } from 'react-i18next';

export const BoardsPage = () => {
  const { data, isLoading } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  const HandleAddBoard = () => {
    dispatch(openModal({ type: ModalTypes.ADD_BOARD, props: null }));
  };

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Typography variant="h3" component="h1" color={theme.palette.primary.main} mb={2}>
        {t('boards')}
      </Typography>
      <Stack direction="row" gap={2} justifyContent="center" flexWrap="wrap" mb={2}>
        <Card sx={{ width: '200px' }}>
          <Button onClick={HandleAddBoard} sx={{ width: '100%', height: '100%' }}>
            + {t('addBoard')}
          </Button>
        </Card>
        {data.map((board) => (
          <BoardItem board={board} key={board.id} />
        ))}
      </Stack>
    </Loader>
  );
};
