const dashboardRoutes = require("./dashboard.route.js");
const systemConfix = require("../../config/system.js");

module.exports= (app) =>{
    const PATH_ADMIN = systemConfix.prefixAdmin;
    //Nhúng dashboard
    app.use(PATH_ADMIN + "/dashboard",dashboardRoutes);
            
}