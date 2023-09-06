import express from 'express';
import { Router } from 'express';
import urlController from 


const router: Router = express.Router();

router.post('/create-proxy-url', urlController.createProxyUrl);

router.get('/:proxy-url', urlController.getUrlByProxyUrl);

export default router;