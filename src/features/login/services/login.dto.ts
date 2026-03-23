export interface LoginResponseDTO {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  access_token: string;
}

export interface LoginRequestDTO {
  email: string;
  pass: string;
}
