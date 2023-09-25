const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { employeeRoute } = require("./routes/employee.routes");
const { userRoute } = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use("/employee", employeeRoute);
app.use("/user", userRoute);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Database Connected");
        console.log(`Server running on port ${process.env.port}`);
    } catch (error) {
        console.log(error.message);
    }
});