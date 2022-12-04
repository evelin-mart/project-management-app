import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { loadBoard, setColumnsInBoard } from 'store/board';
import { Column } from '../../components/Board/Column';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Loader } from 'components/Loader';
import { ROUTES } from 'constants/Routes';
import { ITaskService } from 'services/types/Tasks.types';
import { IItemButtonAddTask } from 'components/Board/types';
import { ModalTypes, openModal } from 'store/modal';
import { useTranslation } from 'react-i18next';

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { idBoard } = useParams();
  const { board, isLoading } = useAppSelector((state) => state.board);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadBoard(String(idBoard)));
  }, [dispatch, idBoard]);

  const column = board.columns.slice();
  if (board.columns.length > 0) {
    column.sort((a, b) => a.order - b.order);
  }

  const moveColumn = (item: { id: string; index: number }) => {
    const column = board.columns.slice(0).sort((a, b) => a.order - b.order);
    const dragColumn = column.find((column) => column.id === item.id);
    const newColumns = column.filter((elem) => item.id !== elem.id);
    newColumns.splice(item.index, 0, dragColumn!);
    const resultColumn = [];
    for (let i = 0; i < newColumns.length; i += 1) {
      resultColumn.push({ ...newColumns[i], order: i + 1 });
    }
    dispatch(setColumnsInBoard(resultColumn));
  };

  const moveTask = (
    drag: { id: string; index: number; columnId: string; taskId: string; task: ITaskService },
    dropId: string
  ) => {
    const columns = board.columns.slice(0);
    const dragId = drag.id;
    const dragIndex = drag.index;
    const dragColId = columns.find((column) => column.tasks.find((task) => task.id === dragId))!.id;
    const dropCulId = columns.find((column) => column.tasks.find((task) => task.id === dropId))!.id;

    if (dragColId === dropCulId) {
      const columnId = columns.find((column) =>
        column.tasks.find((task) => task.id === dragId)
      )!.id;
      const newColumns = columns;
      const column = newColumns.find((column) => column.id === columnId);
      const task = column!.tasks.find((task) => task.id === dragId);
      const newTasks = column!.tasks.filter((task) => task.id !== dragId);
      newTasks.splice(dragIndex, 0, task!);
      const tasksArray = [];
      for (let i = 0; i < newTasks.length; i += 1) {
        tasksArray.push({ ...newTasks[i], order: i + 1 });
      }
      const newColumn = { ...column, tasks: tasksArray };
      const newColumnsArr = newColumns.map((column) =>
        column.id === newColumn.id ? newColumn : column
      );
      dispatch(setColumnsInBoard(newColumnsArr));
    } else {
      const dragColumn = columns.find((column) => column.id === dragColId);
      const task = dragColumn!.tasks.find((task) => task.id === drag.id);
      const newTask = { ...task, order: drag.index + 1 };
      const dragColumnWithoutTaskArray = dragColumn!.tasks.filter((task) => task.id !== dragId);
      const newDragColumnWithoutTaskArray = [];
      for (let i = 0; i < dragColumnWithoutTaskArray.length; i += 1) {
        newDragColumnWithoutTaskArray.push({ ...dragColumnWithoutTaskArray[i], order: i + 1 });
      }
      const newDragColumn = { ...dragColumn, tasks: newDragColumnWithoutTaskArray };

      const dropColumn = columns.find((column) => column.id === dropCulId);
      const newDropColumn = { ...dropColumn, tasks: [...dropColumn!.tasks, newTask] };

      const newColumnsWithNewDragColumn = columns.map((column) =>
        column.id === newDragColumn.id ? newDragColumn : column
      );
      const newColumnsWithNewDropColumn = newColumnsWithNewDragColumn.map((column) =>
        column.id === newDropColumn.id ? newDropColumn : column
      );

      dispatch(setColumnsInBoard(newColumnsWithNewDropColumn));
    }
  };

  const addTaskInEmptyColumn = (item: IItemButtonAddTask, columnId: string) => {
    if (board.columns.find((column) => column.id === columnId)!.tasks.length === 0) {
      const columns = board.columns.slice(0);
      const dragColumn = columns.find((column) => column.id === item.columnId);
      const newDragColumnTasks = dragColumn!.tasks.filter((elem) => elem.id !== item.taskId);
      const newDragColumnTasksOrder = newDragColumnTasks.map((elem, index) => ({
        ...elem,
        order: index + 1,
      }));
      const newDragColumn = { ...dragColumn, tasks: newDragColumnTasksOrder };
      const dropColumn = columns.find((column) => column.id === columnId);
      const newDropColumnTasks = item.task ? [{ ...item.task, order: 1 }] : [];

      const newDropColumn = { ...dropColumn, tasks: newDropColumnTasks };
      const newColumnsArrWithNewDragColumn = columns.map((column) =>
        column.id === newDragColumn.id ? newDragColumn : column
      );
      const newColumnsArrWithNewDropColumn = newColumnsArrWithNewDragColumn.map((column) =>
        column.id === newDropColumn.id ? newDropColumn : column
      );

      const newColumnsArrOrder = newColumnsArrWithNewDropColumn.map((column) => {
        if (column.tasks.find((task) => task.id === item.taskId) && column.id !== columnId) {
          const arr = { ...column, tasks: column.tasks.filter((task) => task.id !== item.taskId) };
          const tasks = arr.tasks.map((task, index) => ({ ...task, order: index + 1 }));
          return { ...arr, tasks: tasks };
        } else {
          return column;
        }
      });
      dispatch(setColumnsInBoard(newColumnsArrOrder));
    }
  };

  const handleNewColumn = () =>
    dispatch(
      openModal({
        type: ModalTypes.ADD_COLUMN,
        props: null,
      })
    );

  return (
    <Loader isLoading={isLoading}>
      <DndProvider backend={HTML5Backend}>
        <Box
          component="div"
          sx={{
            p: '0 20px',
            overflowY: 'hidden',
            overflowX: 'auto',
            width: '100vw',
            flexGrow: 1,
            height: 'calc(100vh - 148px)',
          }}
        >
          <Grid sx={{ width: '100%', height: '40px', mt: '5px', display: 'flex' }}>
            <Link to={`/${ROUTES.BOARDS}`} style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ width: '5%' }}>
                {t('back')}
              </Button>
            </Link>
            <Typography color="textPrimary" variant="h4" component="h2" sx={{ ml: '15px' }}>
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
              flexWrap: 'nowrap',
              minWidth: 'max-content',
              overflow: 'hidden',
            }}
          >
            {column?.map((column, i) => (
              <Column
                key={column.id}
                index={i}
                id={column.id}
                column={column}
                moveColumn={moveColumn}
                moveTask={moveTask}
                addTaskInEmptyColumn={addTaskInEmptyColumn}
              />
            ))}
            <Button
              variant="outlined"
              sx={{ m: '5px', backgroundColor: 'white', height: '4rem', width: '310px' }}
              onClick={handleNewColumn}
            >
              {t('new-col')}
            </Button>
          </Grid>
        </Box>
      </DndProvider>
    </Loader>
  );
};
