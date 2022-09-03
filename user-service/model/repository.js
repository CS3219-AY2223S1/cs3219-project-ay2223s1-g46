import UserModel from './user-model.js';
import 'dotenv/config'
import bcrypt from 'bcrypt';

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
  return UserModel.findOne({username})
}

