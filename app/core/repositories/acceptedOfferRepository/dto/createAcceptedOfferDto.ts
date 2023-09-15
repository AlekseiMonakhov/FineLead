export class CreateAcceptedOfferDto {
    constructor(
        readonly trafficProviderId: number,
        readonly offerId: number,
        readonly proxyLink: string,
    ) {}    
}