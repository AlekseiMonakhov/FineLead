export class Click {
    constructor(
        readonly offerId: number,
        readonly acceptedOfferId: number,
        readonly trafficProviderId: number,
        readonly ip: string,
    )
    {}
}