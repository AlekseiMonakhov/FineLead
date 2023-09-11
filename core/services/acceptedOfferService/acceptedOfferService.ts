import { AcceptedOffer } from '../../models/AcceptedOffer';
import { AcceptedOfferRepository } from '../../repositories/acceptedOfferRepository/acceptedOfferRepository';
import { CreateAcceptedOfferDto } from '../../repositories/acceptedOfferRepository/dto/createAcceptedOfferDto';

export class AcceptedOfferService {
  constructor(private readonly acceptedOfferRepository: AcceptedOfferRepository) {}

  async getById(id: number): Promise<AcceptedOffer> {
    return this.acceptedOfferRepository.getById(id);
  }

  async getByTrafficProviderId(trafficProviderId: number): Promise<AcceptedOffer[]> {
    return this.acceptedOfferRepository.getByTrafficProviderId(trafficProviderId);
  }

  async getByProxyUrl(proxyUrl: string): Promise<AcceptedOffer> {
    return this.acceptedOfferRepository.getByProxyUrl(proxyUrl);
  }

  async getByOfferId(offerId: number): Promise<AcceptedOffer[]> {
    return this.acceptedOfferRepository.getByOfferId(offerId);
  }

  async getAll(): Promise<AcceptedOffer[]> {
    return this.acceptedOfferRepository.getAll();
  }

  async create(dto: CreateAcceptedOfferDto): Promise<AcceptedOffer> {
    return this.acceptedOfferRepository.create(dto);
  }

  async remove(id: number): Promise<void> {
    await this.acceptedOfferRepository.remove(id);
  }
}
