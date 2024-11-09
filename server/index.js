const express = require('express'); var morgan = require('morgan')

const app = express();
const cors = require('cors');
const dbConnect = require("./DB/connection");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const tasksRoutes = require("./routes/tasksRoute");
const userRoutes = require("./routes/userRoute");

dotenv.config();
dbConnect();


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());


app.use(morgan("dev"));
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", userRoutes);


app.use("/", (req, res, next) => {
  res.status(404).json("url not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});