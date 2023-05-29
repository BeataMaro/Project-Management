import { ICol, IColumn } from "./column.model";

export interface Iboard {
  _id?: string;
  title?: string | null;
  owner: string;
  users: string[];
  columns?: IColumn[] | ICol[];
}
