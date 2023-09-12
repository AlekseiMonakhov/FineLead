export class AddClickDto {
    constructor(
        readonly acceptedOfferId: number,
        readonly trafficProviderId: number,
        readonly ip: string,
    ) {}    
}