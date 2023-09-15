import { Request, Response } from "express";
import { OfferService } from "../../core/services/offerService";
import { AddOfferDto } from '../../core/repositories/offerRepository/dto/addOfferDto'
import { UpdateOfferDto } from '../../core/repositories/offerRepository/dto/updateOfferDto'
import  pool from "../db/config/postgresConfig";
import { OfferMapper } from "../db/mappers/offerMapper";
import { OfferRepositoryImpl } from "../db/repositories/offerRepositoryImpl";


const offerRepositoryImpl = new OfferRepositoryImpl(pool);  
const offerMapper = new OfferMapper();

export class OfferController {
  constructor(private offerService: OfferService = new OfferService(offerRepositoryImpl)) {}
  
  async getById(req: Request, res: Response) {
    try {
      const offerId = parseInt(req.params.id);
      const offer = await this.offerService.getById(offerId);
      res.json(offer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByClientId(req: Request, res: Response) {
    try {
      const clientId = parseInt(req.params.clientId);
      const offers = await this.offerService.getByClientId(clientId);
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByUrl(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const offer = await this.offerService.getByUrl(url);
      res.json(offer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByClickCost(req: Request, res: Response) {
    try {
      const clickCost = parseFloat(req.params.clickCost);
      const offers = await this.offerService.getByClickCost(clickCost);
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const offers = await this.offerService.getAll();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const addOfferDto = offerMapper.toDomain(req.body) as AddOfferDto;
      const newOffer = await this.offerService.add(addOfferDto);
      res.status(201).json(newOffer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const offerId = parseInt(req.params.id);
      const updateOfferDto = offerMapper.toDomain(req.body) as UpdateOfferDto;
      const updatedOffer = await this.offerService.update(offerId, updateOfferDto);
      res.json(updatedOffer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const offerId = parseInt(req.params.id);
      await this.offerService.remove(offerId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
