import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const handleListening = () => {
  console.log("✅ Hellow my site");
};

app.listen(4000, handleListening);
