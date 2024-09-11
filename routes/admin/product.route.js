const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller.js");
const storageMulter = require("../../helpers/storageMulter.js");
const multer = require('multer'); //Import multer

const upload = multer({storage:storageMulter()});

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi/",controller.changeMulti)
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post("/create"
    ,upload.single('thumbnail'),
    controller.createPost);


module.exports = router;
