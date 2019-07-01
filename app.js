let express= require("express");
var request = require('request');
let Mock = require("mockjs");
let app = express();
app.all('/test.action', function(req, res) {
    res.json(Mock.mock({
        "status": 200,
        'list|100-300': [{      //数据模板
                       'id|+1': 1,
                       'title': '@cword(2,10) ',
            		   'price': '@natural(1,1000)',
            		   'rensu':'@natural(1,1000)',
            		   'sum':'@natural(1,1000)',
                       'padingnum':'@natural(1,1000)',
                       'image':"@image",
                       'small_title':'@cword(2,10)',
                       'small_price':'@natural(1,1000)',
                       'small_image':"@image",
                       'Big_image':"@image",
                       'MjName':'@cword(2,10) ',
                       'MjImage':'@image',
                       'fenlei|3':[{
                           'name':'@cword(2,4)',
                       }]
                   }]
	}));
	
});
app.all('/nav.action', function(req, res) {
    res.json(Mock.mock({
        "status": 200,
        'Snacks|6': [{      //数据模板
                     'title':'@cword(2,4)',  
                     'fenlei|9':[{'leibie':'@cword(2,4)'}]
                   }],
        'Strictly|6':[{
            'title':'@cword(2,4)',  
            'fenlei|9':[{'leibie':'@cword(2,4)'}]
        }],
        'HealthPres|8':[{
            'title':'@cword(2,4)',  
            'fenlei|9':[{'leibie':'@cword(2,4)'}]
        }],
	}));
	
});
app.all('/header.action', function(req, res) {
    var url ='http://www.klpfood.com//index.php/index/cat'+req.url;
    req.pipe(request(url)).pipe(res);
 });

 app.all('/goods_index.action', function(req, res) {
     var cat = req.url.split("goods_index.action")[1]
    var url ='http://www.klpfood.com/index.php/index/goods_cat'+cat;
    req.pipe(request(url)).pipe(res);
 });
 app.all('/goods_cat.action', function(req, res) {
    var page = req.url.split("goods_cat.action")[1]
   var url ='http://www.klpfood.com/index.php/index/goods_cat'+page;
   req.pipe(request(url)).pipe(res);
});
app.all('/goods.action', function(req, res) {
    var page = req.url.split("=")[1]
   var url ='http://www.klpfood.com/index.php/goods/goodsInfoV2/id/'+page+'.html';
   req.pipe(request(url)).pipe(res);
});
app.listen("8800",function(){
	console.log("服务器创建成功")
    console.log("Server running at http://127.0.0.1:8800/")
});
app.use(express.static(__dirname+"/public"))
