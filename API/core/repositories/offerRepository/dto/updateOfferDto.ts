export class UpdateOfferDto {
    constructor(
        readonly clientId: number,
        readonly url: string,
        readonly clickCost: number,
    ) {}    
}