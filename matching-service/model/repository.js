import PendingMatchModel from './pendingMatch-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createPendingMatch(params) { 
  return new PendingMatchModel(params)
}
export async function findOnePendingMatchAndDelete(params) {
  return PendingMatchModel.findOneAndDelete(params)
}

