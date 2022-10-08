import questionModel from './question-model.js';
import 'dotenv/config'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import difficulty from '../utils/difficulty.js';
import topics from '../utils/topic.js';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB')
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createQuestion({name, text, difficulty, topic}) {
  return new questionModel({name, task, difficulty, topic})
}
