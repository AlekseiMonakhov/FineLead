import { Role } from "../../../models/User";

export class AddUserDto {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly role: Role
    ) {}    
}