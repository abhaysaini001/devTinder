const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhaysaini262002:Abhay%401234@namastenode.b83r3n1.mongodb.net/devTinderDB"
  );
};


module.exports = connectDB;

