import { SERVER } from 'constants/Server';
import { ChangeEvent } from 'react';
import { api } from './apiCreate';

export class File {
  static async uploadFile({ e, taskId }: { e: ChangeEvent<HTMLInputElement>; taskId: string }) {
    const formData = new FormData();
    if (e.target.files) {
      formData.append('file', e.target.files![0]);
    }
    const response = await api.post<undefined>(SERVER.FILE, { taskId: taskId, file: formData }, {});
    return response.data;
  }

  static async downloadFile({ taskId, filename }: { taskId: string; filename: string }) {
    const response = await api.get<undefined>(`${SERVER.FILE}/${taskId}/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}
