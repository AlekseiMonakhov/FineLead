export class AddOfferDto {
    constructor(
        readonly clientId: number,
        readonly url: string,
        readonly clickCost: number,
    ) {}    
}