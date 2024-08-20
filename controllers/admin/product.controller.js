const Product=require("../../models/product.model.js");
// [GET] /admin/products
module.exports.index =async (req, res) => {
  let filterStatus = [
    {
      name:"Tất cả",
      status:"",
      class:""  
    },
    {
      name:"Hoạt động",
      status:"active",
      class:""  
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""  
    }
  ];
  if(req.query.status){
    const index = filterStatus.findIndex(item => item.status == req.query.status);
    filterStatus[index].class="active";
  }else {
    const index = filterStatus.findIndex(item => item.status == "");
    filterStatus[index].class="active";
  }

    let find ={
      deleted:false
  };
    if(req.query.status){
      find.status = req.query.status
    }
    const product=await Product.find(find);
    console.log(req.query.status);
    res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang sản phẩm",
    product:product,
    filterStatus:filterStatus
  });
};


