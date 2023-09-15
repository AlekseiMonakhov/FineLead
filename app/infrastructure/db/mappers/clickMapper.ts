import { Click } from "../../../core/models/Click";
import { ClickDBModel } from "../models/clickDBModel";
import { DBMapper } from "./mapperInterface/MapperInterface";


export class ClickMapper implements DBMapper<Click, ClickDBModel> {
    toDomain(entity: ClickDBModel): Click {
        return new Click(
            entity.offer_id,
            entity.traffic_provider_id,
            entity.ip_address,
        );
    }

    toEntity(domain: Click): ClickDBModel {
        return {
            offer_id: domain.offerId,
            traffic_provider_id: domain.trafficProviderId,
            ip_address: domain.ip,
        };
    }
}
