import UserModel from './user/user-model.js';
import TokenModel from './token/token-model.js';
import 'dotenv/config'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB')
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser({username, password}) { 
  const saltRounds = 10

  // autogen salt and hash
  const passwordHash = await bcrypt.hash(password, saltRounds)

  return new UserModel({username, passwordHash})
}

export async function checkUserExist(username) {
  const user = await UserModel.findOne({username})

  if (user) {
    return true
  } else {
    return false
  }
}

export async function getUser(username) {
  return UserModel.findOne({username})
}

export async function compareHash(username, password) {
  const user = await UserModel.findOne({username})
  if (!user) {
    return false
  }
  const res = await bcrypt.compare(password, user.passwordHash)
  return res
}

export async function createJWT(user) {
  const userForToken = {
    username: user.username,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

export async function deleteUser(username) {
  return UserModel.findOneAndDelete({username})
}

export async function updatePassword(username, newPassword) {
  const saltRounds = 10

  // autogen salt and hash
  const passwordHash = await bcrypt.hash(newPassword, saltRounds)

  const updatedUser = await UserModel.findOneAndUpdate(
    { "username" : username},
    { passwordHash },
    { new: true, runValidators: true, context: 'query' }
  )

  return updatedUser

}

export async function checkTokenBlacklisted(token) {
  
  const findToken = await TokenModel.findOne({token})
  if (findToken) {
    return true
  }
  else {
    return false
  }
}

export async function blackListToken(token) {
  return new TokenModel({token})
}