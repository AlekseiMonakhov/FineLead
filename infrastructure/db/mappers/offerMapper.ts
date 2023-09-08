import { Offer } from "../../../core/models/Offer";
import { OfferDBModel } from "../models/offerDBModel";

interface DBMapper<D, E> {
    toEntity(domain: D): E;
    toDomain(entity: E): D;
}

export class OfferMapper implements DBMapper<Offer, OfferDBModel> {
    toDomain(entity: OfferDBModel): Offer {
        return new Offer(
            entity.id,
            entity.client_id,
            entity.url,
            entity.click_cost,
        );
    }

    toEntity(domain: Offer): OfferDBModel {
        return {
            id: domain.id,
            client_id: domain.clientId,
            url: domain.url,
            click_cost: domain.clickCost,
        };
    }
}
