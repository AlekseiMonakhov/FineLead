import { Offer } from "../../models/Offer";
import { AddOfferDto } from "./dto/addOfferRepo";
import { UpdateOfferDto } from "./dto/updateOfferRepo";

export interface OfferRepo {
    add(dto: AddOfferDto): Offer
    getById(id: number): Offer
    getByClientId(clientId: number): Offer
    getByUrl(url: string): Offer
    getByClickCost(clickCost: number): Offer
    getAll(): Offer
    remove(id: number): void
    update(dto: UpdateOfferDto): Offer
}