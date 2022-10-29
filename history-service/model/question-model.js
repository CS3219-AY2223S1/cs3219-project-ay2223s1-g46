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

QuestionModelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      // creates string id from object _id
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

export default mongoose.model('QuestionModel', QuestionModelSchema)