import mongoose from 'mongoose';
var Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    difficulty: {
        type:String,
        required: true,
    },
    topic: {
        type:String,
        required: true,
    }
})

export default mongoose.model('QuestionModel', QuestionModelSchema)