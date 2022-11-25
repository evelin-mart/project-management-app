import React, { MouseEventHandler } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { BoardData, deleteBoard } from 'store/boards';
import { useNavigate } from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from 'store';
import { closeModal, openModal } from 'store/modal';
import { EditBoard } from 'components/Modal/EditBoard';
import { ConfirmDeletion } from 'components/Modal/ConfirmDeletion';
import { ShowBoard } from 'components/Modal/ShowBoard';

export const BoardItem = ({ board }: { board: BoardData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const description =
    board.description.length > 50 ? `${board.description.slice(0, 47)}...` : board.description;

  const onSubmitDeleteBoard = () =>
    dispatch(deleteBoard(board.id)).then(() => dispatch(closeModal()));

  const expandBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal(<ShowBoard board={board} />));
  };

  const editBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal(<EditBoard board={board} />));
  };

  const handleDeleteBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal(<ConfirmDeletion onSubmit={onSubmitDeleteBoard} type="board" />));
  };

  return (
    <Card
      onClick={() => navigate(`/boards/${board.id}`)}
      sx={{ cursor: 'pointer', width: '200px', display: 'flex', flexDirection: 'column' }}
      title="Go to the board"
    >
      <CardHeader
        title={board.title}
        action={
          <IconButton onClick={expandBoard} title="Show details">
            <ManageSearchIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ overflowWrap: 'break-word' }}>
          {description}
        </Typography>
      </CardContent>
      <Stack direction="row" gap={1} justifyContent="center" sx={{ p: 1, mt: 'auto' }}>
        <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={editBoard}>
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={handleDeleteBoard}
        >
          Delete
        </Button>
      </Stack>
    </Card>
  );
};
