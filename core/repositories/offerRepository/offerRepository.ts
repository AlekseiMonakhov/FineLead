import { Offer } from "../../models/Offer";
import { AddOfferDto } from "./dto/addOfferDto";
import { UpdateOfferDto } from "./dto/updateOfferDto";

export interface OfferRepository {
    add(dto: AddOfferDto): Offer
    getById(id: number): Offer
    getByClientId(clientId: number): Offer
    getByUrl(url: string): Offer
    getByClickCost(clickCost: number): Offer
    getAll(): Offer
    remove(id: number): void
    update(dto: UpdateOfferDto): Offer
}