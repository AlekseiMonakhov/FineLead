import { Pool } from "pg";
import { Offer } from "../../../core/models/Offer";
import { AddOfferDto } from "../../../core/repositories/offerRepository/dto/addOfferDto";
import { UpdateOfferDto } from "../../../core/repositories/offerRepository/dto/updateOfferDto";
import { OfferRepository } from "../../../core/repositories/offerRepository/offerRepository";

export class OfferRepositoryImpl implements OfferRepository {
  constructor(private readonly pool: Pool) {}

  async add(dto: AddOfferDto): Promise<Offer> {
    const { clientId, url, clickCost } = dto;
    const query = `
      INSERT INTO Offers (client_id, url, click_cost)
      VALUES ($1, $2, $3)
      RETURNING offer_id;
    `;
    const values = [clientId, url, clickCost];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      const offerId = result.rows[0].offer_id;
      return new Offer(offerId, clientId, url, clickCost);
    } finally {
      client.release();
    }
  }

  async getById(id: number): Promise<Offer> {
    const query = `
      SELECT * FROM Offers
      WHERE offer_id = $1;
    `;
    const values = [id];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("Offer not found");
      }

      const offerData = result.rows[0];
      return new Offer(offerData.offer_id, offerData.client_id, offerData.url, offerData.click_cost);
    } finally {
      client.release();
    }
  }

  async getByClientId(clientId: number): Promise<Offer[]> {
    const query = `
      SELECT * FROM Offers
      WHERE client_id = $1;
    `;
    const values = [clientId];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.map(offerData => new Offer(offerData.offer_id, offerData.client_id, offerData.url, offerData.click_cost));
    } finally {
      client.release();
    }
  }

  async getByUrl(url: string): Promise<Offer> {
    const query = `
      SELECT * FROM Offers
      WHERE url = $1;
    `;
    const values = [url];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("Offer not found");
      }

      const offerData = result.rows[0];
      return new Offer(offerData.offer_id, offerData.client_id, offerData.url, offerData.click_cost);
    } finally {
      client.release();
    }
  }

  async getByClickCost(clickCost: number): Promise<Offer[]> {
    const query = `
      SELECT * FROM Offers
      WHERE click_cost = $1;
    `;
    const values = [clickCost];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.map(offerData => new Offer(offerData.offer_id, offerData.client_id, offerData.url, offerData.click_cost));
    } finally {
      client.release();
    }
  }

  async getAll(): Promise<Offer[]> {
    const query = `
      SELECT * FROM Offers;
    `;

    const client = await this.pool.connect();
    try {
      const result = await client.query(query);
      return result.rows.map(offerData => new Offer(offerData.offer_id, offerData.client_id, offerData.url, offerData.click_cost));
    } finally {
      client.release();
    }
  }

  async remove(id: number): Promise<void> {
    const query = `
      DELETE FROM Offers
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

  async update(id: number, dto: UpdateOfferDto): Promise<Offer> {
    const { url, clickCost } = dto;
    const query = `
      UPDATE Offers
      SET url = $1, click_cost = $2
      WHERE offer_id = $3
      RETURNING *;
    `;
    const values = [url, clickCost, id];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("Offer not found");
      }

      const offerData = result.rows[0];
      return new Offer(offerData.offer_id, offerData.client_id, offerData.url, offerData.click_cost);
    } finally {
      client.release();
    }
  }
}
