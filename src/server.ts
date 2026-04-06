import app from ".";
import { config } from "./config/config";

const startServer = () => {
  try {
    app.listen(config.PORT, "0.0.0.0", () => {
      console.log(`Alternative Server started. Listening on 0.0.0.0:${config.PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();
