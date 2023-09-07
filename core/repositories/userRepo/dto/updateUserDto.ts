import { Role } from "../../../models/User";

export class UpdateUserDto {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly role: Role
    ) {}    
}