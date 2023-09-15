import { Pool } from "pg";
import { AcceptedOfferRepository } from "../../../core/repositories/acceptedOfferRepository/acceptedOfferRepository";
import { AcceptedOffer } from "../../../core/models/AcceptedOffer";
import { CreateAcceptedOfferDto } from "../../../core/repositories/acceptedOfferRepository/dto/createAcceptedOfferDto";
import dotenv from "dotenv";

dotenv.config();
const serverHost = process.env.SERVER_HOST;
const clickServicePort = process.env.CLICK_SERVICE_PORT;
const clickServicePrefix = process.env.CLICK_SERVICE_PREFIX;


export class AcceptedOfferRepositoryImpl implements AcceptedOfferRepository {
  constructor(private readonly pool: Pool) {}

  async create(dto: CreateAcceptedOfferDto): Promise<AcceptedOffer> {
    const { offerId, trafficProviderId } = dto;
    const proxyLink = `http://${serverHost}:${clickServicePort}/${clickServicePrefix}/${offerId}-${trafficProviderId}`;
    const query = `
      INSERT INTO traffic.accepted_offers (traffic_provider_id, offer_id, proxy_link)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [trafficProviderId, offerId, proxyLink];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      const acceptedOfferData = result.rows[0];
      return new AcceptedOffer(acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link, acceptedOfferData.accepted_offer_id);
    } finally {
      client.release();
    }
  }

  async getById(id: number): Promise<AcceptedOffer> {
    const query = `
      SELECT * FROM traffic.accepted_offers
      WHERE accepted_offer_id = $1;
    `;
    const values = [id];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("Accepted offer not found");
      }

      const acceptedOfferData = result.rows[0];
      return new AcceptedOffer(acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link, acceptedOfferData.accepted_offer_id);
    } finally {
      client.release();
    }
  }

  async getByTrafficProviderId(trafficProviderId: number): Promise<AcceptedOffer[]> {
    const query = `
      SELECT * FROM traffic.accepted_offers
      WHERE traffic_provider_id = $1;
    `;
    const values = [trafficProviderId];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.map(acceptedOfferData => new AcceptedOffer(acceptedOfferData.accepted_offer_id, acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link));
    } finally {
      client.release();
    }
  }

  async getByProxyLink(proxyLink: string): Promise<AcceptedOffer> {
    const query = `
      SELECT * FROM traffic.accepted_offers
      WHERE proxy_link = $1;
    `;
    const values = [proxyLink];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("Accepted offer not found");
      }
      const acceptedOfferData = result.rows[0];
      return new AcceptedOffer(acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link, acceptedOfferData.accepted_offer_id);
    } finally {
      client.release();
    }
  }

  async getByOfferId(offerId: number): Promise<AcceptedOffer[]> {
    const query = `
      SELECT * FROM traffic.accepted_offers
      WHERE offer_id = $1;
    `;
    const values = [offerId];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.map(acceptedOfferData => new AcceptedOffer(acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link, acceptedOfferData.accepted_offer_id));
    } finally {
      client.release();
    }
  }

  async getAll(): Promise<AcceptedOffer[]> {
    const query = `
      SELECT * FROM traffic.accepted_offers;
    `;

    const client = await this.pool.connect();
    try {
      const result = await client.query(query);
      return result.rows.map(acceptedOfferData => new AcceptedOffer(acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link, acceptedOfferData.accepted_offer_id));
    } finally {
      client.release();
    }
  }

  async remove(id: number): Promise<void> {
    const query = `
      DELETE FROM traffic.accepted_offers
      WHERE accepted_offer_id = $1;
    `;
    const values = [id];

    const client = await this.pool.connect();
    try {
      await client.query(query, values);
    } finally {
      client.release();
    }
  }

}
