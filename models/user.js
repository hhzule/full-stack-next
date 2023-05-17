import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "username is required"],
    // match: [
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   "Username invalid",
    //   "it should contain 8-20 alphanumeric characters and be unique",
    // ],
  },
  image: {
    type: String,
  },
});
// the "models" object , provided by Mongoose library, stores
//all the registered models. if a model named "User" already
// exists in the "models" object, it assigns that model to the "User"
// variable, this prevents the model from being redefined, ensureing
// that the existing model is reused

// if a model named "User" does not exist in the "models" object
// the model function will create a new model named "User"

const User = models.User || model("User", UserSchema);

export default User;
