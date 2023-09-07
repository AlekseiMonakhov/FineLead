const enum Role {
    Admin = 'admin',
    Client = 'client',
    TrafficProvider = 'traffic-provider',
}


export class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly role: Role
    ) {}    
}