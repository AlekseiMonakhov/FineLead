import { Pool } from "pg";
import { ClickRepository } from "../../../core/repositories/clickRepository/clickRepository";
import { AddClickDto } from "../../../core/repositories/clickRepository/dto/createClickDto";
import { Click } from "../../../core/models/Click";


export class ClickRepositoryImpl implements ClickRepository {
  constructor(private readonly pool: Pool) {}

  async add(dto: AddClickDto): Promise<Click> {
    const { offerId, acceptedOfferId, trafficProviderId, ip } = dto;
    const query = `
      INSERT INTO traffic.clicks (offer_id, accepted_offer_id, traffic_provider_id, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [offerId, acceptedOfferId, trafficProviderId, ip];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      const clickData = result.rows[0];
      return new Click(clickData.accepted_offer_id, clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address);
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
      return new Click(clickData.accepted_offer_id, clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address);
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
      return result.rows.map(clickData => new Click(clickData.accepted_offer_id, clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address));
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
      return result.rows.map(clickData => new Click(clickData.accepted_offer_id, clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address));
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
      return result.rows.map(clickData => new Click(clickData.accepted_offer_id, clickData.offer_id, clickData.traffic_provider_id, clickData.ip_address));
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
