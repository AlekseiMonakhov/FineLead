export class AddClickDto {
    constructor(
        readonly offerId: number,
        readonly acceptedOfferId: number,
        readonly trafficProviderId: number,
        readonly ip: string,
        readonly clickDatetime: Date,
    ) {}    
}