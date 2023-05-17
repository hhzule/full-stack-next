import mongoose from "mongoose";

let isConnected = false;

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connecting already");
    return;
  }
  try {
    await connectDatabase();
    isConnected = true;
    // console.log("%cThis background!", "background-color: yellow");
    console.log("MDB connection established");
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
