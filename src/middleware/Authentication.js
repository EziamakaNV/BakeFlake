import jwt from 'jsonwebtoken';

import UserModel from '../models/User';

import response from '../responses/Response';

require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    // Check for the token
    if (!token) {
      res.status(401).json({ status: 401, error: 'Unauthorized. Missing token', success: false });
    } else {
      try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        // Create user object in the request
        req.user = user;
        next();
        // Check if the user is still in the DB
        // const userExists = UserModel.findUser(user.email);
        // if (userExists) {
        //   // Create user object in the request
        //   req.user = user;
        //   next();
        // } else {
        //   response(res, 401, 'Malicious token request. You dont exist on the DB!');
        // }
      } catch (error) {
        res.status(500).json({ status: 500, error: `Issue with jwt token. Problem: ${error}` });
      }
    }
  }
}

export default Authentication;
