import { Offer } from "../../models/Offer";
import { AddOfferDto } from "./dto/addOfferDto";
import { UpdateOfferDto } from "./dto/updateOfferDto";

export interface OfferRepository {
    add(dto: AddOfferDto): Promise<Offer>;
    getById(id: number): Promise<Offer>;
    getByClientId(clientId: number): Promise<Offer[]>;
    getByUrl(url: string): Promise<Offer>;
    getByClickCost(clickCost: number): Promise<Offer[]>;
    getAll(): Promise<Offer[]>;
    remove(id: number): Promise<void>;
    update(id: number, dto: UpdateOfferDto): Promise<Offer>;
}
