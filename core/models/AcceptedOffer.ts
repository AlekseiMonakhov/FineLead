export class AcceptedOffer {
    constructor(
        readonly id: number,
        readonly trafficProviderId: number,
        readonly offerId: number,
        readonly proxyLink: string,
    )
    {}
}