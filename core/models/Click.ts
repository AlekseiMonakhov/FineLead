export class Click {
    constructor(
        readonly acceptedOfferId: number,
        readonly trafficProviderId: number,
        readonly ip: string,
    )
    {}
}