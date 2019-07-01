$(function(){
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
  }
  
  //接收URL中的参数booksId
  var food_id = getUrlParam('food_id');
      var pageTotal=0;//总页数 
      var rowTotal=0;//总行数 
      var currentPage=0;//当前页数 
      var startRow=0;//页开始行数 
      var endRow=0;//页结束行数 
      var pageSize=35;//每页行数 
          $.ajax({ 
              url:"/goods_index.action", 
              type:"get", 
              data:{
                  cat:food_id
              },
              dataType:"json",  
              async:true,
              error:function(){ 
              
              }, 
              success:function(data){ 
                  var data = data.result
                  if(data.length>pageSize){
                      $('#prev').css("display",block)
                      $('#next').css("display",blcok)
                  }
                  rowTotal=data.length; 
                  pageTotal=Math.ceil(rowTotal/pageSize);//上取整 
                  currentPage=1; 
                  if(pageTotal==1){ 
                      $.each(data,function(i,item){
                              
                      var bb = `<div class="food-goods"><div class="food-img"><a href="./index/goods.html?lid=${item.goods_id}"><div class="smog"></div>
                      <img src="${item.original_img}" alt="#"></a>
                       </div>
                           <div class="food-title">
                              ${item.goods_name}
                           </div>
                      <div class="food-price">
                                   <p class="price">￥${item.shop_price}</p>
                                  <p class="liulan">${item.click_count}人浏览</p>
                           </div>
                       </div>`
                      $("#plist").append(bb)
                      })
      
                  }else{ 
                      $.each(data,function(i,item){
                          
                          var bb = `<div class="food-goods"><div class="food-img"><a href="./index/goods.html?lid=${item.goods_id}"><div class="smog"></div>
                          <img src="${item.original_img}" alt="#"></a>
                           </div>
                               <div class="food-title">
                                  ${item.goods_name}
                               </div>
                          <div class="food-price">
                                       <p class="price">￥${item.shop_price}</p>
                                      <p class="liulan">${item.click_count}人浏览</p>
                               </div>
                           </div>`
                          $("#plist").append(bb)
                      })
      
                      $.page({
                          ele: '.zh-page ul',
                          curPage: 1, // 当前页
                          visiblePages:6, // 可见页码
                          change: function(num) { // 回调
                              // alert(num);
                          },
                          totalPages: pageTotal // 总页数
                      });
                  } 
              } 
          }); 
      
  
      //翻页 
      function gotoPage(pageNum){ 
          $.ajax({ 
              url:"/goods_index.action", 
              type:"get", 
              data:{
                  cat:good_id
              },
              dataType:"json",  
              async:true,
              error:function(){ 
              
              }, 
              success:function(data){ 
                  var data = data.list
                  var html = ''
                  currentPage=pageNum;  //当前页数 
                  startRow=pageSize*(pageNum-1); //页开始行数
                  endRow=startRow+pageSize; 	//页结束行数
                  endRow=(rowTotal>endRow)?endRow:rowTotal; 
                  $(".food-goods").empty(); 
                  for(var i=startRow;i<endRow;i++){ 	
                      if(data[i].id!==undefined){
                      var id = data[i].id
                          var price = data[i].price;
                      var title = data[i].title;
                      var rensu = data[i].rensu;
                      var img = data[i].image;
                      html+=`<div class="food-goods">
                      <div class="food-img">
                          <a href="./index/goods.html?lid=${id}">
                              <div class="smog"></div>
                          <img src="${img}" alt="#">
                          </a>
                      </div>
                      <div class="food-title">
                          ${title}
                      </div>
                      <div class="food-price">
                              <p class="price">￥${price.toFixed(2)}</p>
                              <p class="liulan">${rensu}人浏览</p>
                      </div>
                  </div>`
                  }
              $("#plist").html(html)
                      }
                      
                     
              } 
              
          }); 
  
      } 
      $.extend({
          // ajax分页
          page: function(options) {
              var defaults = {
                  'visiblePages': 6 // 可见页码(不能小于4)
              };
              var opts = $.extend({}, defaults, options);
              var curPage = opts.curPage;
              // 创建分页列表
              function createPageList(curPage) {
                  var li = '<li class="zh-prev"><a href="###"><span class="zh-icon-prev"></span></a></li>';
                  if(opts.totalPages <= opts.visiblePages) { // 总页数<=可见页
                      for(var i=1; i<=opts.totalPages; i++) {
                          if(curPage == i) {
                              li += '<li class="zh-cur"><a href="###">'+i+'</a></li>';
                          } else {
                              li += '<li><a href="###">'+i+'</a></li>';
                          }
                      }
                  } else { // 总页数>可见页
                      if(curPage < opts.visiblePages-1) { // 当前页<可见页-1
                          for(var i=1; i<=opts.visiblePages-1; i++) {
                              if(curPage == i) {
                                  li += '<li class="zh-cur"><a href="###">'+i+'</a></li>';
                              } else {
                                  li += '<li><a href="###">'+i+'</a></li>';
                              }
                          }
                          li += '<li class="zh-ellipsis">...</li>';
                          li += '<li><a href="###">'+opts.totalPages+'</a></li>';
                      } else if(curPage >= opts.visiblePages-1) {  // 当前页>=可见页-1
                          if(opts.totalPages-curPage <= opts.visiblePages-4) { // 能连到结束
                              li += '<li><a href="###">1</a></li>';
                              li += '<li class="zh-ellipsis">...</li>';
                              for(var i=opts.totalPages-(opts.visiblePages-2); i<=opts.totalPages; i++) {
                                  if(curPage == i) {
                                      li += '<li class="zh-cur"><a href="###">'+i+'</a></li>';
                                  } else {
                                      li += '<li><a href="###">'+i+'</a></li>';
                                  }
                              }
                          } else { // 不能连到结束
                              li += '<li><a href="###">1</a></li>';
                              li += '<li class="zh-ellipsis">...</li>';
                              for(var i=curPage-(opts.visiblePages-4); i<=curPage+1; i++) {
                                  if(curPage == i) {
                                      li += '<li class="zh-cur"><a href="###">'+i+'</a></li>';
                                  } else {
                                      li += '<li><a href="###">'+i+'</a></li>';
                                  }
                              }
                              li += '<li class="zh-ellipsis">...</li>';
                              li += '<li><a href="###">'+opts.totalPages+'</a></li>';
                          }
                      }
                  }
                  li += '<li class="zh-next"><a href="###"><span class="zh-icon-next"></span></a></li>';
                  li += '<li class="zh-total">共'+opts.totalPages+'页</li>';
                  $(opts.ele).html(li);
              }
              createPageList(curPage);
              // 点击页码
              $(opts.ele).off('click');
              $(opts.ele).on('click', 'li:not(.zh-prev, .zh-next, .zh-total, .zh-ellipsis)', function() {
                  curPage = +$(this).text();
                  $(this).addClass('zh-cur').siblings().removeClass('zh-cur');
                  createPageList(curPage);
                  gotoPage(curPage);
                  if(opts.change && typeof opts.change === 'function') {
                      opts.change.call(null, curPage);
                  }
              });
              // 点击前一页
              $(opts.ele).on('click', '.zh-prev', function() {
                  curPage = +$(opts.ele).children('.zh-cur').text();
                  curPage--;
                  if(curPage < 1) return;
                  createPageList(curPage);
                  gotoPage(curPage);
                  if(opts.change && typeof opts.change === 'function') {
                      opts.change.call(null, curPage);
                  } 
              });
              // 点击后一页
              $(opts.ele).on('click', '.zh-next', function() {
                  curPage = +$(opts.ele).children('.zh-cur').text();
                  curPage++;
                  if(curPage > opts.totalPages) return;
                  createPageList(curPage);
                  gotoPage(curPage);
                  if(opts.change && typeof opts.change === 'function') {
                      opts.change.call(null, curPage);
                  }
              });
          }
   
    
        })
      })