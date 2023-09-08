import { Offer } from '../../models/Offer';
import { AddOfferDto } from '../../repositories/offerRepository/dto/addOfferDto';
import { UpdateOfferDto } from '../../repositories/offerRepository/dto/updateOfferDto';
import { OfferRepository } from '../../repositories/offerRepository/offerRepository';

export class OfferService {
  constructor(private readonly offerRepository: OfferRepository) {}

  async getById(id: number): Promise<Offer> {
    return this.offerRepository.getById(id);
  }

  async getByClientId(clientId: number): Promise<Offer[]> {
    return this.offerRepository.getByClientId(clientId);
  }

  async getByUrl(url: string): Promise<Offer> {
    return this.offerRepository.getByUrl(url);
  }

  async getByClickCost(clickCost: number): Promise<Offer[]> {
    return this.offerRepository.getByClickCost(clickCost);
  }

  async getAll(): Promise<Offer[]> {
    return this.offerRepository.getAll();
  }

  async add(dto: AddOfferDto): Promise<Offer> {
    return this.offerRepository.add(dto);
  }

  async update(id: number, dto: UpdateOfferDto): Promise<Offer> {
    return this.offerRepository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.offerRepository.remove(id);
  }
}
