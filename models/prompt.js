import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});
// the "models" object , provided by Mongoose library, stores
//all the registered models. if a model named "User" already
// exists in the "models" object, it assigns that model to the "User"
// variable, this prevents the model from being redefined, ensureing
// that the existing model is reused

// if a model named "User" does not exist in the "models" object
// the model function will create a new model named "User"

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
