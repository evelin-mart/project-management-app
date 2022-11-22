import axios, { AxiosError } from 'axios';
import { SERVER } from 'constants/Server';
import { BaseService } from './BaseService';
import { downloadFileRequest, uploadFileRequest } from './types/File.types';

export class File extends BaseService {
  static async uploadFile({ e, taskId }: uploadFileRequest) {
    try {
      const formData = new FormData();
      if (e.target.files) {
        formData.append('taskId', taskId);
        formData.append('file', e.target.files![0]);
      }
      const response = await this.api.post<undefined>(SERVER.FILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }
      return { errorMessage: 'undefined error' };
    }
  }

  static async downloadFile({ taskId, filename }: downloadFileRequest) {
    try {
      const response = await this.api.get<Blob>(`${SERVER.FILE}/${taskId}/${filename}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }
      return { errorMessage: 'undefined error' };
    }
  }
}
