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

export interface VerifyEmailDTO {
  id: string;
  token: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  user: UserDTO;
  token: string;
}
