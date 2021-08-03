import "./db";
import "./models/Video";
import app from "../src/server";

const handleListening = () => {
  console.log("✅ Hellow my site");
};

app.listen(4000, handleListening);
