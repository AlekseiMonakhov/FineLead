import express from 'express';
import { Router } from 'express';
import { ClickController } from '../controllers/clickController';

const clickRouter: Router = express.Router();
const clickController = new ClickController();

clickRouter.get('/click-by-id/:id', async (req, res) => {
  await clickController.getById(req, res);
});

clickRouter.get('/click-by-traffic-provider-id/:trafficProviderId', async (req, res) => {
  await clickController.getByTrafficProviderId(req, res);
});

clickRouter.get('/all-clicks', async (req, res) => {
  await clickController.getAll(req, res);
});

clickRouter.post('/:proxyLink', async (req, res) => {
  await clickController.add(req, res);
});

clickRouter.delete('/delete-click/:id', async (req, res) => {
  await clickController.remove(req, res);
});

export default clickRouter;
