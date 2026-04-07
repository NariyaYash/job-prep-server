require("dotenv").config();

const app = require("../src/app");
const connectToDB = require("../src/config/database");

if (process.env.PRODUCTION === "false") {
    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running on port " + (process.env.PORT || 3000))
    })
}



connectToDB();

module.exports = app;
