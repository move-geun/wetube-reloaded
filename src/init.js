import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = procees.env.PORT || 4000;

const handleListening = () => {
  console.log("✅ Hellow my site");
};

app.listen(PORT, handleListening);
