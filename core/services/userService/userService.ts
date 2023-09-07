import { UserRepository } from "../../repositories/userRepository/userRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}