import mongoose from "mongoose";

let isConnected = false;
export const db = {
  connect: async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
      console.log("MongoDb is already connected.");
      return;
    }

    try {

      await mongoose.connect(process.env.MONGODB_URI!, {
        dbName: "promptopia",
      });
      isConnected = true;
    } catch (error) {
    }
  },
};
