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
import { useNavigate } from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from 'store';
import { ModalTypes, openModal } from 'store/modal';
import { DeleteItems } from 'components/Modal/ConfirmDeletion';
import { useTranslation } from 'react-i18next';

export const BoardItem = ({ board }: { board: BoardData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const description =
    board.description.length > 50 ? `${board.description.slice(0, 47)}...` : board.description;

  const expandBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal({ type: ModalTypes.SHOW_BOARD, props: { board } }));
  };

  const editBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal({ type: ModalTypes.EDIT_BOARD, props: { board } }));
  };

  const handleDeleteBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(
      openModal({
        type: ModalTypes.DELETE,
        props: { type: DeleteItems.BOARD, args: { id: board.id } },
      })
    );
  };

  return (
    <Card
      onClick={() => navigate(`/boards/${board.id}`)}
      sx={{ cursor: 'pointer', width: '200px', display: 'flex', flexDirection: 'column' }}
      title={`${t('gtb')}`}
    >
      <CardHeader
        title={
          <Typography
            component="h5"
            variant="h5"
            sx={{ maxWidth: '135px', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {board.title}
          </Typography>
        }
        disableTypography={true}
        action={
          <IconButton onClick={expandBoard} title={`${t('show')}`}>
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
        <Button
          size="small"
          variant="outlined"
          title={`${t('edit')}`}
          startIcon={i18n.resolvedLanguage === 'en' ? <EditIcon /> : undefined}
          onClick={editBoard}
        >
          {t('edit')}
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          title={`${t('del')}`}
          endIcon={i18n.resolvedLanguage === 'en' ? <DeleteIcon /> : undefined}
          onClick={handleDeleteBoard}
        >
          {t('del')}
        </Button>
      </Stack>
    </Card>
  );
};
