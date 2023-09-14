import { Pool, PoolClient } from "pg";
import { Click } from "../../../core/models/Click";
import { ClickRepository } from "../../../core/repositories/clickRepository/clickRepository";
import { AddClickDto } from "../../../core/repositories/clickRepository/dto/addClickDto";



export class ClickRepositoryImpl implements ClickRepository {
  constructor(private readonly pool: Pool) {}

  private static async getOfferUrlByOfferId(
    client: PoolClient,
    offerId: number
  ): Promise<string | null> {
    const query = 'SELECT url FROM traffic.offers WHERE offer_id = $1';
    const result = await client.query(query, [offerId]);
    const data = result.rows[0];
    return data ? data.url : null;
  }

  async add(dto: AddClickDto): Promise<string | null> {
    const { offerId, trafficProviderId, ip } = dto;
    const query = `
      INSERT INTO traffic.clicks (offer_id, traffic_provider_id, ip_address)
      VALUES ($1, $2, $3);
    `;
    const values = [offerId, trafficProviderId, ip];

    const client: PoolClient = await this.pool.connect();

    try {
      await client.query(query, values);
      const offerUrl = await ClickRepositoryImpl.getOfferUrlByOfferId(client, offerId);
      return offerUrl || null;
    } finally {
      client.release();
    }
  }
  
  async getById(id: number): Promise<Click> {
    const query = `
      SELECT * FROM traffic.clicks
      WHERE click_id = $1;
    `;
    const values = [id];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("Click not found");
      }

      const clickData = result.rows[0];
      return new Click(clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address);
    } finally {
      client.release();
    }
  }

  async getByTrafficProviderId(trafficProviderId: number): Promise<Click[]> {
    const query = `
      SELECT * FROM traffic.clicks
      WHERE traffic_provider_id = $1;
    `;
    const values = [trafficProviderId];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.map(clickData => new Click(clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address));
    } finally {
      client.release();
    }
  }


  async getByOfferId(offerId: number): Promise<Click[]> {
    const query = `
      SELECT * FROM traffic.clicks
      WHERE offer_id = $1;
    `;
    const values = [offerId];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.map(clickData => new Click(clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address));
    } finally {
      client.release();
    }
  }

  async getAll(): Promise<Click[]> {
    const query = `
      SELECT * FROM traffic.clicks;
    `;

    const client = await this.pool.connect();
    try {
      const result = await client.query(query);
      return result.rows.map(clickData => new Click(clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address));
    } finally {
      client.release();
    }
  }

  async remove(id: number): Promise<void> {
    const query = `
      DELETE FROM traffic.clicks
      WHERE click_id = $1;
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
