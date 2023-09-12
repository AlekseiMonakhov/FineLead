import { Click } from '../models/Click';
import { ClickRepository } from '../repositories/clickRepository/clickRepository';
import { AddClickDto } from '../repositories/clickRepository/dto/addClickDto';

export class ClickService {
  constructor(private readonly clickRepository: ClickRepository) {}

  async getById(id: number): Promise<Click> {
    return this.clickRepository.getById(id);
  }

  async getByTrafficProviderId(trafficProviderId: number): Promise<Click[]> {
    return this.clickRepository.getByTrafficProviderId(trafficProviderId);
  }

  async getByOfferId(offerId: number): Promise<Click[]> {
    return this.clickRepository.getByOfferId(offerId);
  }

  async getAll(): Promise<Click[]> {
    return this.clickRepository.getAll();
  }

  async add(dto: AddClickDto): Promise<string | null> {
    return this.clickRepository.add(dto);
  }

  async remove(id: number): Promise<void> {
    await this.clickRepository.remove(id);
  }

  _getClicksByOfferId(offerId: number): Promise<Click[]> {
    return this.clickRepository.getByOfferId(offerId);
  }
}
