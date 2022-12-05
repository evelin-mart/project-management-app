import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskData } from 'services/types/Tasks.types';

export const ShowTask = ({ task, user }: { task: TaskData; user: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5" align="center" sx={{ wordBreak: 'break-all' }}>
        {task.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ maxHeight: '400px', overflowY: 'auto', overflowWrap: 'break-word', mt: 2 }}
      >
        {task.description}
      </Typography>
      <Typography variant="h6">
        {t('user')}: {user}
      </Typography>
    </>
  );
};
