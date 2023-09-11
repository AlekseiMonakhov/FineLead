import { AcceptedOffer } from "../../models/AcceptedOffer";
import { CreateAcceptedOfferDto } from "./dto/createAcceptedOfferDto";

export interface AcceptedOfferRepository {
    create(dto: CreateAcceptedOfferDto): Promise<AcceptedOffer>;
    getById(id: number): Promise<AcceptedOffer>;
    getByTrafficProviderId(trafficProviderId: number): Promise<AcceptedOffer[]>;
    getByProxyUrl(proxyUrl: string): Promise<AcceptedOffer>;
    getByOfferId(offerId: number): Promise<AcceptedOffer[]>;
    getAll(): Promise<AcceptedOffer[]>;
    remove(id: number): Promise<void>;
}
