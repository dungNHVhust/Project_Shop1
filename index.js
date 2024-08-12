require('dotenv').config();
const express = require("express"); // Import express
const app = express(); //Gọi hàm express() và khởi tạo app
const port = process.env.PORT; //Set port mặc định là 3000
const route = require("./routes/client/index.route.js");

//Setup PUG
app.set("views", "./views");
app.set("view engine", "pug");

//Nhúng router
route(app);

app.listen(port, () => {
  //Gọi hàm listen truyền vào tham số port và gọi hàm arrow
  console.log(`This is example app listening on port ${port}`);
});
