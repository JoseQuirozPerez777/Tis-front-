export interface LoginResponseDTO {
  id: string;
  email: string;
  name: string;
  access_token: string;
}

export interface LoginRequestDTO {
  email: string;
  pass: string;
}
