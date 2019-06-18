import fs from 'fs';

import Validation from '../validations/Validation';

import response from '../responses/Response';

import axios from 'axios';

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

  static async createRecipient(req, res) {
    try {
        const responseBody = await axios.get('https://api.paystack.co/balance',{ headers: { 'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } });
        response(res, responseBody.status, responseBody.data )
    } catch (error) {
        response(res, 500, error);
    }
  }

  static async validateAccount(req, res) {
      const account_number = req.query.account_number;
      const bank_code = req.query.bank_code;
      const validationObject = { account_number, bank_code };
      const { error } = Validation.accountValidation(validationObject);
      console.log(account_number, bank_code);
      if (error) {
          response(res, 400, error);
      } else {
        try {
            const responseBody = await axios.get('https://api.paystack.co/bank/resolve',{ 
                headers: { 'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
                params: { account_number, bank_code},
                validateStatus: (status) => { return status < 500 }, // Reject only if the status code is greater than or equal to 500
            });
            console.log(responseBody.data);
            if (responseBody.status > 299){
                return response(res, responseBody.status, responseBody.data.message );
            } else{
                response(res, responseBody.status, responseBody.data);
            }
            
            
        } catch (error) {
            response(res, error.response.status, error.response.data);
        }
      }
  }
}

export default APIController;
