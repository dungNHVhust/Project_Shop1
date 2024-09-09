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

  const product = await Product.find(find).sort({position:"desc"}).limit(objectPagination.limitItem).skip(objectPagination.skip);
  // console.log(req.query.status);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang sản phẩm",
    product: product,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
};
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {
  // console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({_id: id},{status:status});

  req.flash("success","Cập nhật trạng thái thành công!");

  res.redirect('back');
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  // console.log(type);
  // console.log(ids);
  switch (type) {
    case "active":
      await Product.updateMany({ _id: {$in: ids} },{status:"active"});
      req.flash("success",`Cập nhật trạng thái ${ids.length} sản phẩm thành công !`);
      break;
    case "inactive":
      await Product.updateMany({ _id: {$in: ids} },{status:"inactive"});
      req.flash("success",`Cập nhật trạng thái ${ids.length} sản phẩm thành công !`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: {$in: ids} },{
        deleted: true,
        deletedAt: new Date()
      });
      break;
    case "change-position":
      for (const item of ids) {
        let [id,position] = item.split("-");
        position=parseInt(position);
        await Product.updateOne({_id: id},{
          position:position
        });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
}
// [PATCH] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) => {
  const id = req.params.id;
  await Product.updateOne({_id: id},{
    deleted:true,
    deletedAt: new Date()
  });
  res.redirect('back');
}