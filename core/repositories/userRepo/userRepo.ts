import { User } from "../../models/User";
import { AddUserDto } from "./dto/addUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";

export interface UserRepo {
    add(dto: AddUserDto): User
    getById(id: number): User
    getByEmail(email: string): User
    getByName(name: string): User
    getAll(): User
    remove(id: number): void
    update(dto: UpdateUserDto): User
}