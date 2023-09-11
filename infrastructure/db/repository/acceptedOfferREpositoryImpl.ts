import { Pool } from "pg";
import { AcceptedOfferRepository } from "../../../core/repositories/acceptedOfferRepository/acceptedOfferRepository";
import { AcceptedOffer } from "../../../core/models/AcceptedOffer";
import { CreateAcceptedOfferDto } from "../../../core/repositories/acceptedOfferRepository/dto/createAcceptedOfferDto";

export class AcceptedOfferRepositoryImpl implements AcceptedOfferRepository {
  constructor(private readonly pool: Pool) {}

  async create(dto: CreateAcceptedOfferDto): Promise<AcceptedOffer> {
    const { offerId, trafficProviderId } = dto;
    const proxyLink = `http://${process.env.HOST}:${process.env.PORT}/${offerId}/${trafficProviderId}`;
    const query = `
      INSERT INTO traffic.accepted_offers (offer_id, traffic_provider_id, proxy_link)
      VALUES ($1, $2, $3)
      RETURNING offer_id;
    `;
    const values = [offerId, trafficProviderId, proxyLink];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      const acceptedOfferData = result.rows[0];
      return new AcceptedOffer(acceptedOfferData.accepted_offer_id, acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link);
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
      return new AcceptedOffer(acceptedOfferData.accepted_offer_id, acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link);
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
      const offerData = result.rows[0];
      return new AcceptedOffer(offerData.offer_id, offerData.client_id, offerData.url, offerData.click_cost);
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
      return result.rows.map(acceptedOfferData => new AcceptedOffer(acceptedOfferData.accepted_offer_id, acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link));
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
      return result.rows.map(acceptedOfferData => new AcceptedOffer(acceptedOfferData.accepted_offer_id, acceptedOfferData.offer_id, acceptedOfferData.traffic_provider_id, acceptedOfferData.proxy_link));
    } finally {
      client.release();
    }
  }

  async remove(id: number): Promise<void> {
    const query = `
      DELETE FROM traffic.accepted_offers
      WHERE offer_id = $1;
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
