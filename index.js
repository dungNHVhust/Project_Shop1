require('dotenv').config();
const express = require("express"); // Import express
//Connect Database
const database = require("./config/database.js");
database.connect();

const systemConfig = require("./config/system.js")

const app = express(); //Gọi hàm express() và khởi tạo app
const port = process.env.PORT; //Set port mặc định là 3000
const route = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");

//Setup PUG
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'));

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Nhúng router
route(app);
routeAdmin(app);

app.listen(port, () => {
  //Gọi hàm listen truyền vào tham số port và gọi hàm arrow
  console.log(`This is example app listening on port ${port}`);
});
