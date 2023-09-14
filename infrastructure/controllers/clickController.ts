import { Request, Response } from "express";
import  pool from "../db/postgres/config/postgresConfig";
import { ClickService } from "../../core/services/clickService";
import { AddClickDto } from "../../core/repositories/clickRepository/dto/addClickDto";
import { ClickRepositoryImpl } from "../db/postgres/repositories/clickRepositoryImpl";

const clickRepositoryImpl = new ClickRepositoryImpl(pool);  

export class ClickController {
  constructor(private clickService: ClickService = new ClickService(clickRepositoryImpl)) {}
  
  async getById(req: Request, res: Response) {
    try {
      const ClickId = parseInt(req.params.id);
      const click = await this.clickService.getById(ClickId);
      res.json(click);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByTrafficProviderId(req: Request, res: Response) {
    try {
      const trafficProviderId = parseInt(req.params.trafficProviderId);
      const acceptedOffers = await this.clickService.getByTrafficProviderId(trafficProviderId);
      res.json(acceptedOffers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const acceptedOffers = await this.clickService.getAll();
      res.json(acceptedOffers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async add(req: Request, res: Response) {
    try {
      const { ip } = req;
      const { proxyLink } = req.params;
      const [OfferId, trafficProviderId] = proxyLink.split('-');
      const addClickDto = new AddClickDto(
        parseInt(OfferId),
        parseInt(trafficProviderId),
        ip
      );
  
      const redirectUrl = await this.clickService.add(addClickDto);
  
      if (redirectUrl) {
        res.redirect(redirectUrl);
      } else {
        res.status(404).json({ error: 'Redirect URL not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const acceptedOfferId = parseInt(req.params.id);
      await this.clickService.remove(acceptedOfferId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
