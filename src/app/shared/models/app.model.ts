import { Iboard } from "./board.model";
import { Iuser } from "./user.model";

export interface AppStateInterface {
    boards: Iboard[];
    users: Iuser[];
  }