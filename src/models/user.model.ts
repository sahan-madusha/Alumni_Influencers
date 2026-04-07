export interface CreateUserDTO {
  email: string;
  password: string;
  name?: string;
}

export interface UserDTO {
  id: string | number;
  email: string;
  name?: string | null;
  status: string;
  createdAt: Date;
}
