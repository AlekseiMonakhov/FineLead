import express from 'express';
import { Router } from 'express';
import { AcceptedOfferController } from '../controllers/acceptedOfferController';

const acceptedOfferRouter: Router = express.Router();
const acceptedOfferController = new AcceptedOfferController();

acceptedOfferRouter.get('/accepted-offer-by-id/:id', async (req, res) => {
  await acceptedOfferController.getById(req, res);
});

acceptedOfferRouter.get('/accepted-offer-by-traffic-provider-id/:trafficProviderId', async (req, res) => {
  await acceptedOfferController.getByTrafficProviderId(req, res);
});

acceptedOfferRouter.get('/accepted-offer-by-proxy-link/:proxyLink', async (req, res) => {
  await acceptedOfferController.getByProxyLink(req, res);
});

acceptedOfferRouter.get('/accepted-offer-by-offer-id/:offerId', async (req, res) => {
  await acceptedOfferController.getByOfferId(req, res);
});

acceptedOfferRouter.get('/all-accepted-offers', async (req, res) => {
  await acceptedOfferController.getAll(req, res);
});

acceptedOfferRouter.post('/create-accepted-offer', async (req, res) => {
  await acceptedOfferController.create(req, res);
});

acceptedOfferRouter.delete('/delete-accepted-offer/:id', async (req, res) => {
  await acceptedOfferController.remove(req, res);
});

export default acceptedOfferRouter;
