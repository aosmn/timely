const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  if (process.env.NODE_ENV === 'staging') {
    dotenv.config({ path: path.resolve(__dirname, '.env.staging') });
  } else {
    dotenv.config({ path: path.resolve(__dirname, '.env.dev') });
  }
}