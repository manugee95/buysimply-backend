const express = require("express");
const app = express();


const login = require("./routes/login")
const loan = require("./routes/loans")

app.use(express.json())
app.use("/login", login)
app.use("/loans", loan)

app.listen(3000, () => console.log("listening on port 3000"));
