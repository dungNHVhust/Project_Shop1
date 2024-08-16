const Product=require("../../models/product.model.js");
// [GET] /admin/products
module.exports.index =async (req, res) => {
    const product=await Product.find({
        deleted: false
    });
    console.log(product);
    res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang sản phẩm",
    product:product
  });
};
