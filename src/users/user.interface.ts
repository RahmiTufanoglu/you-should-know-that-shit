export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  highscore: number;
  signedInWith: boolean;
  createdAt: Date;
  updatedAt: Date;
}
