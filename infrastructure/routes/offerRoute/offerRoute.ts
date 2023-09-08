import express from 'express';
import { Router } from 'express';
import { OfferController } from '../../controllers/offerController/offerController';

const offerRouter: Router = express.Router();
const offerController = new OfferController();

offerRouter.get('/:id', async (req, res) => {
  await offerController.getById(req, res);
});

offerRouter.get('/client/:clientId', async (req, res) => {
  await offerController.getByClientId(req, res);
});

offerRouter.get('/url/:url', async (req, res) => {
  await offerController.getByUrl(req, res);
});

offerRouter.get('/clickCost/:clickCost', async (req, res) => {
  await offerController.getByClickCost(req, res);
});

offerRouter.get('/', async (req, res) => {
  await offerController.getAll(req, res);
});

offerRouter.post('/', async (req, res) => {
  await offerController.create(req, res);
});

offerRouter.put('/:id', async (req, res) => {
  await offerController.update(req, res);
});

offerRouter.delete('/:id', async (req, res) => {
  await offerController.remove(req, res);
});

export default offerRouter;
