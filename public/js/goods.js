$(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    var goods_id = decodeURIComponent(location.search.slice(1).split("=")[1])
    $.ajax({
        type: 'get',
        url: '/goods.action/', //请求的url地址
        data: {
            goods_id
        },
        dataType: 'json',
        async: true,
        success: function (data) {
            // //返回值在进行访问抽取的方法，从后台返回
            var res = data.result
            console.log(res)
            if (res == undefined) {
                window.location.href = "http://www.klpfood.com/index.php/goods/goodsInfoV2/id/" + goods_id + '.html';
            }
            var bb = ''
            var fenlei = res.navigate_goods
            var img = res.images;
            var ll = ''
            var goods_content = res.goods_content
            var length = 0
            for (var j in fenlei) {
                var aa = `<li>${fenlei[j]}</li><li>></li>`
                $('.goods_leibie').append(aa);
            }

            $.each(img, function (i, item) {
                img = `<li><img src="${item.image_url}" alt="#"></li>`
                $('.par_pro').append(img);
            })

            bb = `<div class="goods" id="products">
                <div class="goods_image">
                    <div class="goods_img_big">
                        <img src="${res.original_img}" alt="#">
                    </div>
                </div>
                <div class="goods_detail" >
                    <div class="goods_detail_title">
                       <h2> ${res.goods_name}</h2>

                    </div>
                    <div class="goods_detail_price">
                         <div class="g_price">
                                <p class="price_red">￥${res.shop_price}</p>
                                <p >${res.click_count}次浏览</p>
                         </div>
                    </div>
                    <div class="shopping_car">
                        <div id="addCart_f"></div>
                        <div class="erweima">
                        <div class="ewm_con">
                            <img src="${res.qr}" alt="#">
                            <p>扫描二维码进入商品详情</p>
                        </div>
                    </div>
                    </div>
                    <div class="goods_last">
                        <div class="ser_pro">
                            <span>服务承诺</span>
                            <ul>
                                <li><a href="#"><img src="image/logo/7.png">支持七天无理由退货</a></li>
                                <li><a href="#"><img src="image/logo/like.png">正品保证</a></li>
                            </ul>
                         </div>
                         <div class="reminder">
                            <span>温馨提示</span>
                            <p>由 良心田 发货并提供售后服务。</p>
                         </div>
                    </div>
        
                </div> 
                <div class="looklook">
                    <div class="top">
                        <div class="look_text"><span>看了又看</span></div>
                        <div class="new">
                            <img src="image/logo/shuaxin.png" alt="#">
                            <span class="newData">换一批</span></div>
                    </div>
                    <div class="carousel">
                      <ul class="look_pro">
                    </ul>
                    </div>
                  
                </div>
            </div>`

            $('#products').html(bb)
            var look = res.look_see
            for (var i = 0; i < look.length; i++) {
                ll += `<li><a href="./index/goods.html?lid=${look[i].goods_id}">
                <img src='${look[i].original_img}' alt="#">
                <p>${look[i].goods_name}</p>
                <strong>￥${look[i].shop_price}</strong>
                </a>
            </li>`

            }

            $('.look_pro').html(ll);
            $('.par_cont').html(goods_content)
            $("#products").on('mouseenter', function () {

                $('#addCart_f').click(function () {
                    $('.erweima').css('display', 'block')
                })
                $('.erweima').click(function () {
                    $(this).css('display', 'none')
                })
                var move = 0
                $('.looklook .top .new').click(function () {
                    move++
                    if (move > look.length / 2 - 1) {
                        move = 1
                    }
                    var b = -360 * move + 'px'
                    $('.look_pro').css('top', b)

                })

            });
        }

    })



})