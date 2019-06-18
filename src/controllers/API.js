import fs from 'fs';

import Validation from '../validations/Validation';

import response from '../responses/Response';

import axios from 'axios';

// Cloudinary
require('dotenv').config();

class APIController {
  static async checkBalance(req, res) {
    try {
        const responseBody = await axios.get('https://api.paystack.co/balance',{ headers: { 'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } });
        response(res, responseBody.status, responseBody.data )
    } catch (error) {
        response(res, 500, error);
    }
  }
}

export default APIController;
