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
import { BoardData } from 'store/boards';
import { NavLink } from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from 'store';

export const BoardItem = ({ board }: { board: BoardData }) => {
  const dispatch = useAppDispatch();

  const description =
    board.description.length > 100 ? `${board.description.slice(0, 97)}...` : board.description;

  const expandBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };

  const editBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };

  const deleteBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <NavLink to={`/boards/${board.id}`}>
      <Card>
        <CardHeader
          title={board.title}
          action={
            <IconButton onClick={expandBoard} title="Show details">
              <ManageSearchIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', pb: 2, mt: 'auto' }}>
          <Button startIcon={<EditIcon />} onClick={editBoard}>
            Edit
          </Button>
          <Button endIcon={<DeleteIcon />} onClick={deleteBoard}>
            Delete
          </Button>
        </Stack>
      </Card>
    </NavLink>
  );
};
