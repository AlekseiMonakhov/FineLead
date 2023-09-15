export class AcceptedOffer {
    constructor(
        readonly offerId: number,
        readonly trafficProviderId: number,
        readonly proxyLink: string,
        readonly id?: number,
    )
    {}
}