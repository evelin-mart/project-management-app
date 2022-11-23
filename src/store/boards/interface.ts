export interface BoardData {
  id: string;
  title: string;
  description: string;
}

export type BoardsState = {
  data: Array<BoardData>;
  isLoading: boolean;
  error: string;
};
