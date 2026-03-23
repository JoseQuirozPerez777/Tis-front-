import type { LoginResponseDTO } from "./login.dto";
import type { User } from "../models/user.model";

export const loginAdapter = {
  toUser(dto: LoginResponseDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      fullName: `${dto.first_name} ${dto.last_name}`,
      token: dto.access_token,
    };
  },
};
