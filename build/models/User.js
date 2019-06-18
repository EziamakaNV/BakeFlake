"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable linebreak-style */
class UserModel {
  constructor() {
    this.users = [{
      id: 1,
      email: 'janedee@test.com',
      firstName: 'Jane',
      lastName: 'Dee',
      password: '$2b$10$mir1ZgwOSTPGaGUlHJUpX.C03pLhmDm.e8rrKFagPh98VhdlD2rky'
    }];
  }

  findUser(email) {
    return this.users.find(user => user.email === email);
  } // createUser(user) {
  //   const newUser = this.users.push({ id: this.users.length + 1, ...user });
  //   return this.users[newUser - 1];
  // }


}

var _default = new UserModel();

exports.default = _default;