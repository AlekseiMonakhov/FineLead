export class Click {
    constructor(
        readonly id: number,
        readonly offerId: number,
        readonly acceptedOfferId: number,
        readonly ipAdress: string,
        readonly clickDatetime: Date,
    )
    {}
}