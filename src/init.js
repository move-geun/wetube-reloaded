import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const handleListening = () => {
  console.log("✅ Hellow my site");
};

app.listen(3000, handleListening);
