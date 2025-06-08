const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Allow both localhost (dev) and your deployed frontend URL (change this URL after deploying frontend)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dev-tinder-oubdcd68s-abhay-sainis-projects.vercel.app"
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Database Connection established..");
    app.listen(PORT, () => {
      console.log(`Server is successfully running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Cannot be connected!!", err.message);
  });
