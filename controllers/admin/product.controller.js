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
  // Pagiantion
  let objectPagination = {
    currentPage: 1,
    limitItem : 4
  };
  if(req.query.page){
    objectPagination.currentPage=parseInt(req.query.page);
  }

  objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItem;
  const countProducts = await  Product.countDocuments(find);
  const totalPage = Math.ceil(countProducts/objectPagination.limitItem);
  objectPagination.totalPage = totalPage;
  //End Pagination

  const product = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
  console.log(req.query.status);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang sản phẩm",
    product: product,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
};
// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {
  // console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({_id: id},{status:status});
  res.redirect('back');
}