export type User = {
  id: number;
  role: string;
  name: string;
  email: string;
  password: string;
};

export type UserSafe = Omit<Omit<User, "password">, "id">;

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};
