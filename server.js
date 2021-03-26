const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors")
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())

//Routes
app.options('*', cors()) 
app.use("/", require("./routes/url"))
// app.use("/", (req, res) => {
//   try{
//     res.status(200).send("API Active")
//   } catch (err) {
//     res.status(500).send(err.message)
//   }
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
