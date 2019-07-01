$(function(){
    $(`<link rel="stylesheet" href="./css/header.css">`).appendTo("head");
 
      $.ajax({
      url:"./index/header.html",
      type:"get",
      async:true,
      success:function(res){
        $(res).replaceAll("#pc_header");   
      }
    })
    
 function ajax2(){
  $.ajax({
    type:"GET",
    url:'/header.action',
    data:{
    },
async:true,
error:function(error){
   console.log(error)
},
success:function(res){
  var data = JSON.parse(res)
  var food = data.result.food
  var material = data.result.material
  var rest = data.result.rest
  //休闲食品
  $.each(food,function(a,item0){
    var bb = `<li><a href="/index/first-index.html?food_id=${item0.id}">${item0.name}</a> <div id="datal" class="datalPc xiuxian${a}" ></div></li>`

    $('.xiuxian_sp').append(bb)
    $.each(item0['options'],function(i,item){ 
  
      var aa =`<div class="datal_list" ><p class="datal_l_t"><a href="/index/second-index.html?food_id=${item0.id}_${item.id}">${item.name}</a></p><ul class="datal_content" id=dd${item.id}></ul></div>`
     $('.xiuxian'+a).append(aa)
     $.each(item['options'],function(j,item2){
         var bb = `<li><a href="/index/header_index.html?cat=${item0.id}_${item.id}_${item2.id}">${item2.name}</a></li><div class="small_xian"></div></div></li>`
         $('#dd'+item.id).append(bb)
     })
     })
})
  // 严选食材
  $.each(material ,function(a,item0){
    var bb = `<li><a href="/index/first-index.html?food_id=${item0.id}">${item0.name}</a> <div id="datal" class="datalPc yanxuan${a}" ></div></li>`

    $('.yanxuan_sc').append(bb)
    $.each(item0['options'],function(i,item){ 
  
      var aa =`<div class="datal_list" ><p class="datal_l_t"><a href="/index/second-index.html?food_id=${item0.id}_${item.id}">${item.name}</a></p><ul class="datal_content" id=dd${item.id}></ul></div>`
     $('.yanxuan'+a).append(aa)
     $.each(item['options'],function(j,item2){
         var bb = `<li><a href="/index/header_index.html?cat=${item0.id}_${item.id}_${item2.id}">${item2.name}</a></li><div class="small_xian"></div></div></li>`
         $('#dd'+item.id).append(bb)
     })
     })
})
   //养生滋补
   $.each(rest ,function(a,item0){
    var bb = `<li><a href="/index/first-index.html?food_id=${item0.id}">${item0.name}</a> <div id="datal" class="datalPc yangsheng${a}" ></div></li>`

    $('.yangsheng_zp').append(bb)
    $.each(item0['options'],function(i,item){ 
  
      var aa =`<div class="datal_list" ><p class="datal_l_t"><a href="/index/second-index.html?food_id=${item0.id}_${item.id}">${item.name}</a></p><ul class="datal_content" id=dd${item.id}></ul></div>`
     $('.yangsheng'+a).append(aa)
     $.each(item['options'],function(j,item2){
         var bb = `<li><a href="/index/header_index.html?cat=${item0.id}_${item.id}_${item2.id}">${item2.name}</a></li><div class="small_xian"></div></div></li>`
         $('#dd'+item.id).append(bb)
     })
     })
})

}
  });
    }
  setTimeout(function(){
    ajax2()
  },200)
 
  
      })