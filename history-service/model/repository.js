import HistoryModel from './history-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB')
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createHistory({username,partnerUsername, question, chatHistory, codeHistory, finishDate}) {
  return new HistoryModel({username,partnerUsername, question, chatHistory, codeHistory, finishDate})
}

export async function getUserHistory({username}) {
  const userHistory = await HistoryModel.find({
    "username": username }).populate('question');
  return userHistory
}