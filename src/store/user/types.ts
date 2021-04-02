type UserId = number;

export type User = {
  id: UserId;
  username: string;
  firstName: string;
  lastName: string;
};

export type FormUser = {
  username: string;
  password: string;
  token: string;
  isAuthenticated: boolean;
};
