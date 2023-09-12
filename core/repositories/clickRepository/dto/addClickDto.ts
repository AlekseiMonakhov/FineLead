export class AddClickDto {
    constructor(
        readonly offerId: number,
        readonly trafficProviderId: number,
        readonly ip: string,
    ) {}    
}