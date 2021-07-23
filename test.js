import express from "express";

const app = express();

const urlLogger = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Protected</h1>");
  } else {
    console.log(`Path : ${url}`);
    next();
  }
};

const timeLogger = (req, res, next) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  console.log(`Time : ${year}. ${month}. ${day}`);
  next();
};

const secureLogger = (req, res, next) => {
  const protocol = req.protocol;
  if (protocol === "http") {
    console.log("⭕ Secure ⭕");
  } else {
    console.log("❌Insecure❌");
  }
  next();
};

app.use(urlLogger, timeLogger, secureLogger);
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
app.listen(4000, () => `Listening!✅`);
