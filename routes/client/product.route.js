const express = require("express");
const router = express.Router();
const controller=require("../../controllers/client/product.controller.js")

router.get('/products',controller.product);

// router.get('/products/create',(req,res)=>{
//     res.render("client/pages/products/index.pug");
// });

// router.get('/products/edit',(req,res)=>{
//     res.render("client/pages/products/index.pug");
// });

module.exports = router;