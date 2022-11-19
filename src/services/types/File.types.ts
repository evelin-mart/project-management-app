import { ChangeEvent } from 'react';

export type uploadFileRequest = { e: ChangeEvent<HTMLInputElement>; taskId: string };

export type downloadFileRequest = { taskId: string; filename: string };
