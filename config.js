const configJson = require('./config/config.json');
const environment = process.env.NODE_ENV || 'production';
 
const config = {
  ...configJson[environment],
  environment,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  YOUR_API_KEY: process.env.YOUR_API_KEY,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  USER_MAIL: process.env.USER_MAIL,
  USER_PASSWORD: process.env.USER_PASSWORD,
  MERCHANT_ID: process.env.MERCHANT_ID,
  URL: process.env.URL,
  HASH_KEY: process.env.HASH_KEY,
  HASH_IV: process.env.HASH_IV,
  IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  IMGUR_SECRET: process.env.IMGUR_SECRET,
  username: environment === 'production' ? process.env.DATABASE_USERNAME : configJson[environment].username,
  password: environment === 'production' ? process.env.DATABASE_PASSWORD : configJson[environment].password,
  database: environment === 'production' ? process.env.DATABASE : configJson[environment].database,
  host: environment === 'production' ? process.env.DATABASE_HOST : configJson[environment].host,
};

module.exports = config;