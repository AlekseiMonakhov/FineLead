import { OfferRepository } from '../../repositories/offerRepository/offerRepository';

export class OfferService {
  constructor(private readonly offerRepository: OfferRepository) {}
}