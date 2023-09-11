export class Click {
    constructor(
        readonly clickId: number,
        readonly offerId: number,
        readonly acceptedOfferId: number,
        readonly trafficProviderId: number,
        readonly ip: string,
        readonly clickDatetime: Date,
    )
    {}
}