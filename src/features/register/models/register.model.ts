export interface RegisterUser {
  fullName: string;
  profession: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
  };
}
