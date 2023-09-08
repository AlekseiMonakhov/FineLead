import express from 'express';
import { Router } from 'express';
import { OfferController } from '../../controllers/offerController/offerController';

const offerRouter: Router = express.Router();
const offerController = new OfferController();

offerRouter.get('/offer-by-id/:id', async (req, res) => {
  await offerController.getById(req, res);
});

offerRouter.get('/offer-by-client-id/:clientId', async (req, res) => {
  await offerController.getByClientId(req, res);
});

offerRouter.get('/offer-by-url/:url', async (req, res) => {
  await offerController.getByUrl(req, res);
});

offerRouter.get('/offer-by-click-cost/:clickCost', async (req, res) => {
  await offerController.getByClickCost(req, res);
});

offerRouter.get('/all-offers', async (req, res) => {
  await offerController.getAll(req, res);
});

offerRouter.post('/create-offer', async (req, res) => {
  console.log(req.body);
  await offerController.create(req, res);
});

offerRouter.put('/update-offer/:id', async (req, res) => {
  await offerController.update(req, res);
});

offerRouter.delete('/delete-offer/:id', async (req, res) => {
  await offerController.remove(req, res);
});

export default offerRouter;
