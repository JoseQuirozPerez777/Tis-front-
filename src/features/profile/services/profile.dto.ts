import type { ProfileUser } from '../models/profile.model';

export type ProfileRequestDto = ProfileUser;

export interface ProfileResponseDto {
  ok: boolean;
  msg: string;
  profile?: {
    fullName: string;
    profession: string;
    bio: string;
  };
}