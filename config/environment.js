const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});
const development = {
  name: "development",
  asset_path: "./assests",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "luckyron1279@gmail.com",
      pass: "Lakshy##12",
    },
  },
  google_client_id:
    "697420632189-08hcjfqd9h4vggo52svrj0f5o7v2flo2.apps.googleusercontent.com",
  google_client_secret: "4h0c4P5T3ocPjrOUWmuur5-L",
  google_callback_url: "http://localhost:7000/users/auth/google/callback",
  Mongo_Db_Url:
    "mongodb+srv://anshita:pipdIq5fqHCYrgO7@cluster0.adtj0.mongodb.net/codeial_production?retryWrites=true&w=majority",
  jwt_secret: "codeial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_USER_PASS,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  Mongo_Db_Url: process.env.Mongo_Db_Url,
  jwt_secret: process.env.Jwt_Secret,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.CODEIAL_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CODEIAL_ENVIRONMENT);
