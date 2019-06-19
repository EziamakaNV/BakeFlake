/* eslint-disable linebreak-style */
import express from 'express';

import Authentication from '../middleware/Authentication';

const router = express.Router();

const option = { root: process.cwd() };

const sendFile = (res, path, options) => {
  return res.sendFile(path, options);
};

router.get('/login', (req, res) => {
  sendFile(res, 'views/login.html', option);
});

router.get('/dashboard', Authentication.verifyToken, (req, res) => {
  sendFile(res, 'views/dashboard.html', option);
});

router.get('/create_recipient', Authentication.verifyToken, (req, res) => {
  sendFile(res, 'views/create_recepient.html', option);
});

router.get('/transfer_funds', Authentication.verifyToken, (req, res) => {
  sendFile(res, 'views/transfer_funds.html', option);
});

router.get('/bulk_transfer', Authentication.verifyToken, (req, res) => {
  sendFile(res, 'views/bulk_transfer.html', option);
});

router.get('/logout', Authentication.verifyToken, (req, res) => {
  res.clearCookie('jwt', { httpOnly: true });
  res.clearCookie('user');
  res.redirect('/login');
});

export default router;
