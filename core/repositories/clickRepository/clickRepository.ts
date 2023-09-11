import { Click } from "../../models/Click";
import { AddClickDto } from "./dto/createClickDto";

export interface ClickRepository {
    add(dto: AddClickDto): Promise<Click>;
    getById(id: number): Promise<Click>;
    getByTrafficProviderId(trafficProviderId: number): Promise<Click[]>;
    getByOfferId(offerId: number): Promise<Click[]>;
    getAll(): Promise<Click[]>;
    remove(id: number): Promise<void>;
}
