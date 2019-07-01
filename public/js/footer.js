$(function(){
    $(`<link rel="stylesheet" href="./css/footer.css">`).appendTo("head");
    $.ajax({
      url:"./index/footer.html",
      type:"get",
      async: true,
      success:function(res){
        $(res).replaceAll("#pc_footer");    
      }
    })
  })