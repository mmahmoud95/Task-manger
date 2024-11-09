const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to TaskManger_Data_Base successfully");
    })
    .catch((err) => {
      console.log(err, "could not connect to TaskManger_Data_Base");
    });
};

module.exports = dbConnect;