'use strict';

import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import httpErrors from 'http-errors';

const userSchema = mongoose.Schema({
    passwordHash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    tokenSeed: { type: String, required: true, unique: true },
});

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compare(password, this.passwordHash)
      .then(response => {
          if(!response) {
              throw new httpErrors(401, '__AUTH__: incorrect username or password')
          } 
          return this;
      });
};

userSchema.methods.createToken = function() {
    this.tokenSeed = crypto.randomBytes(64).toString('hex');

    return this.save()
      .then(user => {
        // izzy - here we know the tokenSeed is unique
        return jwt.sign({
            tokenSeed: user.tokenSeed}, process.env.APP_SECRET);
      });
};

const User = module.exports = mongoose.model('user', userSchema);

User.create = (username, email, password) => {
    const HASH_SALT_ROUNDS = 8;
    return bcrypt.hash(password, HASH_SALT_ROUNDS)
      .then(passwordHash => {
        // izzy - creating a token seed
        let tokenSeed = crypto.randomBytes(64).toString('hex');
        return new User({username, email, passwordHash, tokenSeed}).save();
      });
      // izzy - password gone!
};


