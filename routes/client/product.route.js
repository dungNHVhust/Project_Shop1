const express = require("express");
const router = express.Router();

router.get('/products',(req,res)=>{
    res.render("client/pages/products/index.pug");
});

// router.get('/products/create',(req,res)=>{
//     res.render("client/pages/products/index.pug");
// });

// router.get('/products/edit',(req,res)=>{
//     res.render("client/pages/products/index.pug");
// });

module.exports = router;