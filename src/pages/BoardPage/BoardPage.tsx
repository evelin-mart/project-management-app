import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loadBoard, setColumnsInBoard, setModal } from 'store/board';
import { Column } from '../../components/Board/Column';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { ManagedModal } from 'components/Modal/ManagedModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { idBoard } = useParams();
  const { board, modal } = useAppSelector((state) => state.board);
  React.useEffect(() => {
    dispatch(loadBoard(String(idBoard)));
  }, [dispatch, idBoard]);

  const moveColumn = (item) => {
    const prevColumn = board.columns.slice(0).sort((a, b) => a.order - b.order);
    const dragColumn = prevColumn.find((column) => column.id === item.id);
    const newColumns = prevColumn.filter((elem, i) => item.id !== elem.id);
    newColumns.splice(item.index, 0, dragColumn);
    console.log(newColumns);

    // newColumns.reduce((acc, elem, i) => (elem.order = i + 1), 0);

    const arr = [];
    for (let i = 0; i < newColumns.length; i += 1) {
      arr.push({ ...newColumns[i], order: i + 1 });
    }
    dispatch(setColumnsInBoard(arr));
  };

  const moveTask = (drag, dropId) => {
    console.log(drag, dropId);

    const prev = board.columns.slice(0);
    const dragId = drag.id;
    const dragIndex = drag.index;
    const dragColId = prev.find((column) => column.tasks.find((task) => task.id === dragId)).id;
    const dropCulId = prev.find((column) => column.tasks.find((task) => task.id === dropId)).id;

    if (dragColId === dropCulId) {
      console.log('same column');
      const columnId = prev.find((column) => column.tasks.find((task) => task.id === dragId)).id;
      const newColumns = prev;
      const column = newColumns.find((column) => column.id === columnId);
      const task = column.tasks.find((task) => task.id === dragId);
      const newTasks = column.tasks.filter((task) => task.id !== dragId);
      newTasks.splice(dragIndex, 0, task);
      const arr = [];
      for (let i = 0; i < newTasks.length; i += 1) {
        arr.push({ ...newTasks[i], order: i + 1 });
      }
      const newColumn = { ...column, tasks: arr };
      const newColumnsArr = newColumns.map((column) =>
        column.id === newColumn.id ? newColumn : column
      );
      console.log('rr', newColumnsArr);
      dispatch(setColumnsInBoard(newColumnsArr));
    } else {
      console.log('different column');
      const newColumns = prev;
      const dragColumn = newColumns.find((column) => column.id === dragColId);
      const task = dragColumn.tasks.find((task) => task.id === drag.id);
      const newTask = { ...task, order: drag.index + 1 };
      const dragColumnWithoutTaskArray = dragColumn.tasks.filter((task) => task.id !== dragId);
      const newDragColumnWithoutTaskArray = [];
      for (let i = 0; i < dragColumnWithoutTaskArray.length; i += 1) {
        newDragColumnWithoutTaskArray.push({ ...dragColumnWithoutTaskArray[i], order: i + 1 });
      }
      const newDragColumn = { ...dragColumn, tasks: newDragColumnWithoutTaskArray };

      const dropColumn = newColumns.find((column) => column.id === dropCulId);
      const newDropColumn = { ...dropColumn, tasks: [...dropColumn.tasks, newTask] };

      const newColumnsArr = newColumns.map((column) =>
        column.id === newDragColumn.id ? newDragColumn : column
      );
      const newColumnsArr2 = newColumnsArr.map((column) =>
        column.id === newDropColumn.id ? newDropColumn : column
      );

      dispatch(setColumnsInBoard(newColumnsArr2));
    }
  };

  const col = board.columns.slice();
  if (board.columns.length > 0) {
    col.sort((a, b) => a.order - b.order);
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
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
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
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
              height: '81vh',
            }}
          >
            {col?.map((column, i) => (
              <Column
                key={column.id}
                index={i}
                id={column.id}
                column={column}
                moveColumn={moveColumn}
                moveTask={moveTask}
              />
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
      </DndProvider>
    </>
  );
};
