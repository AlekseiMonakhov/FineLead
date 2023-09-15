import { Request, Response } from "express";
import  pool from "../db/config/postgresConfig";
import { AcceptedOfferService } from "../../core/services/acceptedOfferService";
import { CreateAcceptedOfferDto } from "../../core/repositories/acceptedOfferRepository/dto/createAcceptedOfferDto";
import { AcceptedOfferMapper } from "../db/mappers/acceptedOfferMapper";
import { AcceptedOfferRepositoryImpl } from "../db/repositories/acceptedOfferRepositoryImpl";

const acceptedOfferRepositoryImpl = new AcceptedOfferRepositoryImpl(pool);  
const acceptedOfferMapper = new AcceptedOfferMapper();

export class AcceptedOfferController {
  constructor(private acceptedOfferService: AcceptedOfferService = new AcceptedOfferService(acceptedOfferRepositoryImpl)) {}
  
  async getById(req: Request, res: Response) {
    try {
      const acceptedOfferId = parseInt(req.params.id);
      const acceptedOffer = await this.acceptedOfferService.getById(acceptedOfferId);
      res.json(acceptedOffer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByTrafficProviderId(req: Request, res: Response) {
    try {
      const trafficProviderId = parseInt(req.params.trafficProviderId);
      const acceptedOffers = await this.acceptedOfferService.getByTrafficProviderId(trafficProviderId);
      res.json(acceptedOffers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByProxyLink(req: Request, res: Response) {
    try {
      const proxyLink = req.params.proxyLink;
      const acceptedOffer = await this.acceptedOfferService.getByProxyLink(proxyLink);
      res.json(acceptedOffer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByOfferId(req: Request, res: Response) {
    try {
      const offerId = parseInt(req.params.offerId);
      const acceptedOffers = await this.acceptedOfferService.getByOfferId(offerId);
      res.json(acceptedOffers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const acceptedOffers = await this.acceptedOfferService.getAll();
      res.json(acceptedOffers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const createAcceptedOfferDto = acceptedOfferMapper.toDomain(req.body) as CreateAcceptedOfferDto;
      const newAcceptedOffer = await this.acceptedOfferService.create(createAcceptedOfferDto);
      res.status(201).json(newAcceptedOffer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const acceptedOfferId = parseInt(req.params.id);
      await this.acceptedOfferService.remove(acceptedOfferId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
