const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  //Đoạn bộ lọc
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
 // Tìm kiếm 
  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex){
    find.title = objectSearch.regex;
  }
  const product = await Product.find(find);
  console.log(req.query.status);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang sản phẩm",
    product: product,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword
  });
};
