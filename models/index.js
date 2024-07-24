import {config} from "dotenv";
config();
import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

//mongoose.set("strictQuery", false);
console.log(url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

export default mongoose;
