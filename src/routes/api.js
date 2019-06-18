/* eslint-disable linebreak-style */
import express from 'express';

import Authentication from '../middleware/Authentication';

import APIController from '../controllers/API';

const router = express.Router();

router.get('/balance', Authentication.verifyToken, APIController.checkBalance);


export default router;
