export interface Iuser {
  _id: string;
  name: string;
  login: string;
  password?: string;
}

export interface Ilogin {
  login?: string | null;
  password?: string | null;
}

export interface Isignup {
  name?: string | null;
  login?: string | null;
  password?: string | null;
}

export interface Itoken {
  token: string;
}
