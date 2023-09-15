export class Offer {
    constructor(
        readonly id: number,
        readonly clientId: number,
        readonly url: string,
        readonly clickCost: number,
    )
    {}
}