export interface ProfileUser {
  fullName: string;
  profession: string;
  bio: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    profession: string;
    bio: string;
  };
}