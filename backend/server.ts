const dotenv = require("dotenv");
const Mongoose = require('mongoose');
const app=require('./app')
dotenv.config({ path: './config.env' });
Mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected succesfully !'));

const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER IS COONECTED TO PORT ${process.env.PORT}`);
});
