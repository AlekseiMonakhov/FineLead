import { AcceptedOffer } from "../../../core/models/AcceptedOffer";
import { AcceptedOfferDBModel } from "../models/acceptedOfferDBModel";
import { DBMapper } from "./mapperInterface/MapperInterface";

export class AcceptedOfferMapper implements DBMapper<AcceptedOffer, AcceptedOfferDBModel> {
    toDomain(entity: AcceptedOfferDBModel): AcceptedOffer {
        return new AcceptedOffer(
            entity.accepted_offer_id,
            entity.offer_id,
            entity.traffic_provider_id,
            entity.proxy_link,
        );
    }

    toEntity(domain: AcceptedOffer): AcceptedOfferDBModel {
        return {
            accepted_offer_id: domain.id,
            offer_id: domain.offerId,
            traffic_provider_id: domain.trafficProviderId,
            proxy_link: domain.proxyLink,
        };
    }
}
