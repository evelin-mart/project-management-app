import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loadBoard, setModal } from 'store/board';
import { Column } from '../../components/Board/Column';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { ManagedModal } from 'components/Modal/ManagedModal';

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { idBoard } = useParams();
  const { board, modal } = useAppSelector((state) => state.board);
  React.useEffect(() => {
    dispatch(loadBoard(String(idBoard)));
  }, [dispatch, idBoard]);

  return (
    <>
      <Box
        component="div"
        sx={{
          mx: 'auto',
          overflow: 'hidden',
          overflowX: 'auto',
          width: '100vw',
          flexGrow: 1,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          my="1rem"
        >
          <Button variant="text" sx={{ width: '5%' }}>
            <ArrowBackIcon />
          </Button>
          <Typography
            color="textPrimary"
            sx={{ width: '90%', pl: '35%' }}
            variant="h4"
            component="h2"
          >
            {board.title}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          component="div"
          sx={{
            minWidth: 'max-content',
            overflow: 'hidden',
          }}
        >
          {board.columns?.map((column) => (
            <Column key={column.id} column={column} />
          ))}
          <Button
            variant="outlined"
            style={{ backgroundColor: 'white', height: '4rem', width: '350px' }}
            sx={{ m: 1 }}
            onClick={() => {
              dispatch(setModal('AddColumn'));
            }}
          >
            New column
          </Button>
        </Grid>
      </Box>
      {modal !== '' && <ManagedModal />}
    </>
  );
};
