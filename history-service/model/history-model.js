import mongoose from 'mongoose';
import QuestionModel from './question-model.js';
var Schema = mongoose.Schema
let HistoryModelSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    partnerUsername : {
        type: String,
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: QuestionModel
    },
    chatHistory: {
        type: String,
        required: true,
    },
    codeHistory: {
        type: String,
        required: true,
    },
    finishDate: {
        type: Date,
        required: true,
    }
})

// Date format is 'yyyy-mm-dd'

HistoryModelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    // creates string id from object _id
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

export default mongoose.model('HistoryModel', HistoryModelSchema)