export interface Iboard {
  _id?: string;
  title?: string | null;
  owner: string;
  users: string[];
}
