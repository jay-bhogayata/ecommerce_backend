import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("DB CONNECTED SUCCESSFULLY !");

    app.on("error", (error) => {
      console.error("ERROR: ", error);
      throw error;
    });

    app.listen(config.PORT, () => {
      console.log(`server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("ERROR : ", error);
    throw error;
  }
})();
