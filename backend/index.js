const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors({
    origin: "*"
}));
app.use(express.json());
const connectDB = require("./config/db.config").default;
connectDB();

app.use(require("./modules/user/routes/user.route"));
app.use(require("./modules/student/student.route"));



app.get("/",(q,s)=>{
    s.send("home");
})

var port = process.env.PORT || '3001'
app.listen(port);
