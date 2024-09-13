module.exports.createPost = (req,res,next) => {
    if(!req.body.title){
        req.flash("error","Vui lòng nhập tiêu đề!!!");
        // Redirect về trang trước
        const previousPage = req.get('Referer'); // Lấy URL trang trước
        res.redirect(previousPage);
        return ;
    
      }
    if(!req.body.title.length < 6){
        req.flash("error","Vui lòng nhập tiêu đề ít nhất 6 ký tự !!!");
        // Redirect về trang trước
        const previousPage = req.get('Referer'); // Lấy URL trang trước
        res.redirect(previousPage);
        return ;
    
      }
      next();
} 