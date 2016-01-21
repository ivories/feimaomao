/**
 * Created by Administrator on 2015/7/21.
 * 适用于 2015/7/21 网站版本
 */

$(document).ready(function(){
    bootbox.setLocale("zh_CN");

    $("#show_weibo").on("click", function () {
        mbox("大花猫的微博号：大花猫网");
    });
    $("#show_qq").on("click", function () {
        mbox("大花猫的QQ群号：99420132");
    });
    $("#show_weixin").on("click", function () {
        mbox("大花猫的微信公众号：");
    });
/*    $(".member-login").on("click",function(){
        mbox(":/user/ajax_login/", function(){
            hideMbox();
        }, "", "", false);
    });
    $(".member-register").on("click",function(){
        mbox(":/user/ajax_register/", function(){
            hideMbox();
        }, "", "", false);
    });*/

    //检测浏览器版本
    $.tipBrowserUpgrade();

    //返回页面顶部
    $(window).scroll(function () {
        if ($(this).scrollTop() > 70) $('.back-top').fadeIn(); else $('.back-top').fadeOut();
        if ($(this).scrollTop() > 100) {
            $(".navbar.navbar-default.navbar-fixed-top").fadeIn(1000);
        }
        else
        {
            $(".navbar.navbar-default.navbar-fixed-top").fadeOut(1000);
        }
    });

    /* Owl carousel */
    $(".owl-carousel").owlCarousel({
        slideSpeed: 500,
        rewindSpeed: 1000,
        mouseDrag: true,
        stopOnHover: true
    });
    /* Own navigation */
    $(".owl-nav-prev").click(function () {
        $(this).parent().next(".owl-carousel").trigger('owl.prev');
    });
    $(".owl-nav-next").click(function () {
        $(this).parent().next(".owl-carousel").trigger('owl.next');
    });

    (function() {
            $(".banner_slider .slide img").each(function () {
                var $this = $(this);
                $this.width($this.parent().parent().width());
            });
    })();

    // 想买//喜欢
    $(".like").on("click" ,function(){
        var $this=$(this);
        $this.blur();
        $.post(
            "/peripherals/like/",
            {id:$this.data("pid")},
            function(data)
            {
                if("undefined" != typeof data.login&&!data.login)
                {
                    mbox("你尚未登录", "", "去登录", function () {
                        location.href="/user/login/";
/*                        mbox(":/user/ajax_login/", function(){
                            hideMbox();
                        }, "", "", false);*/
                    });

                }
                else if(data.want)
                {
                    $this.addClass("disabled");
                    if(data.count)
                    {
                        $("#like").html("喜欢（"+data.count+"）");
                        mbox("添加“喜欢”成功，您可以<a href='/user/favorite_peripherals/'>去个人中心查看已喜欢的商品</a>");
                    }
                    else if(data.want)
                    {
                        mbox("您已添加过“喜欢”，您可以<a href='/user/favorite_peripherals/'>去个人中心查看已喜欢的商品</a>");
                    }
                }
            },"json"
        );
    });

    $(".show_size").on("click",function(){
        var img= $(".show_size").data("img");
        mbox("<img src="+img+"  width=100% />");
        return false;
    });

    //用户发表意见留言
    $("button.btn_msg").click(function () {
        var pid = $(this).data("id");
        if ($("#input_user_msg").val().replace(/(\s+)$/g, '').replace(/^\s+/g, '')) {
            $.post(
                "/user_msg/send/" + pid + ".htm",
                "msg=" + $("#input_user_msg").val(),
                function (result) {
                    if (null != result.login && !result.login) {
                        mbox("您还没有登陆喔...", "", "去登陆", function () {
                            location.href="/user/login/";
                            /*mbox(":/user/ajax_login/", "", "", "", false);*/
                        });
                    }
                    else if (result.code) {
                        $("#input_user_msg").val("");
                        mbox(result.msg);
/*                        var by_me = '<div class="item-background">' +
                            '<div class="item">' +
                            '<img src="<{$msg.avatar}>"/>' +
                            '<span><{$msg.nickname}>&nbsp;</span>' +
                            '<label>&nbsp;<{$msg.time2Str}></label>' +
                            '<br>' +
                            '<dd><{$msg.content}></dd>' +
                            '</div>' +
                            '</div>';
                        by_me = by_me.replace("<{$msg.nickname}>", result.nickname);
                        by_me = by_me.replace("<{$msg.avatar}>", result.avatar);
                        by_me = by_me.replace("<{$msg.time2Str}>", "刚刚");
                        by_me = by_me.replace("<{$msg.content}>", $("#input_user_msg").val());
                        $(".user_msg_list .list-unstyled").append(by_me);*/
                    }
                    else {
                        mbox("网络传输数据失败");
                    }
                },
                "json"
            )

        }
        else {
            mbox("请输入你的表达的意见");
        }
    });


    //用户晒图
/*    $(".show-peripherals").each(function(){

        $(this).on("click",function(){
            var $this=$(this);
            var id=$this.data("id");
            var pid=$this.data("pid");
            var oi_id=$this.data("oi-id");
            var od_id=$this.data("od-id");
            if(id){
                //删除
                bootbox.confirm("确定要删除该同款秀？",function(result){
                    if(result)
                    {
                        $.get("/user/del_buyer_show/"+id+".htm",
                            function(data){
                                if(data.success)
                                {
                                    location.reload();
                                }
                            },
                            "json");
                    }
                })
            }else {
                //秀一秀
                var peripherals_img= $this.parents("tr").children("td").children("img").prop("src");
                var peripherals_title=$this.parents("tr").children("td")[1].innerText;
                peripherals_img=peripherals_img.replace("80-80","300-300");
                $("#peripherals_img").prop("src",peripherals_img);
                $("#peripherals_title").text(peripherals_title);
                $(".show_times .post").on("click",function(){
                    var file_upload1=$("#file_upload1").val();
                    var file_upload2=$("#file_upload2").val();
                    var file_upload3=$("#file_upload3").val();
                    //var file_upload3=$("#file_upload3").val();
                    var content=$("#content").val();
                    if(file_upload1.length<=1||file_upload2.length<=1||file_upload3.length<=1)
                    {
                        mbox("请上传三张照片");
                        return false;
                    }
                    if(content.length<5)
                    {
                        mbox("一句话，至少也地要有5个字吧！");
                        return false;
                    }
                    if(content.length>300)
                    {
                        mbox("不是写作文喔，不用写超过300个字符的！");
                        return false;
                    }
                    $("input[name=pid]").val(pid);
                    $("input[name=oi_id]").val(oi_id);
                    $("input[name=od_id]").val(od_id);
                    $("form[name=buyer_show_post_form]").submit();
                });

                $(".buyer_show_list").hide();
                $(".show_times").show();
            }
        })
    });
*/

    //快递查询
    $(".logistics a.express_online").each(function(){
        var $a=$(this);
        $a.on("click",function(e){
            if($a.parent().find("ul").index()<0) {
                $.get($a.attr("href"), function (data) {
                    if (data.message == "ok") {
                        var item_html = "<ul>";
                        $(data.data).each(function (i, item) {
                            item_html += "<li><label>" + item["time"] + "</label><label>" + item["context"] + "</label></li>"
                        });
                        item_html += "</ul>";
                        $a.parent().append(item_html);
                        $a.parent().append(data.powered);
                    }
                }, "json");
            }
            stopDefault(e);
        });
    });

    //保存用户资料修改
    $('#save_account_info').on('click', function () {
        var $btn = $(this).button('saving');
        var nickname = $("#account_form #nickname").val();
        var mobile = $("#account_form #mobile").val();
        var qq = $("#account_form #qq").val();
        var sex = $("#account_form #sex").val();
        if (nickname.length <= 0) {
            mbox("请留下您的大名！", function () {
                $btn.button('reset');
            });
            return false;
        }
        if (mobile.length > 0 && !mobile.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/)) {
            mbox("请输入正确的手机号码！", function () {
                $btn.button('reset');
            });
            return false;
        }
        if (qq.length > 0 && !qq.match(/^\d{5,10}$/)) {
            mbox("请输入正确的QQ号码！", function () {
                $btn.button('reset');
            });
            return false;
        }

        $.post("/user/ajax_edit_post/",
            $('#account_form').serialize(),
            function (data) {
                if (0 == data.err) {
                    mbox(data.msg, function () {
                        $(".ui-head h1 a").html(nickname + "&nbsp;<i class=\"fa fa-pencil\"></i>");
                        $(".dd-menu .dd-link h3").html(nickname);
                        $btn.button('reset');
                    });
                }
                else {
                    mbox(data.msg, function () {
                        $btn.button('reset');
                    });
                }
            },
            "json");
    });

    //保存用户收货地址操作
    var address = {};
    address.Init = function (node) {
        var form_data;
        if ("undefined" == typeof node)
            form_data = $(this).serializeArray();
        else
            form_data = $(node).serializeArray();

        $.each(form_data, function (i, field) {
            address[field.name] = field.value;
        });
        return address;
    };
    address.validate=function(node){
        address.Init(node);
        if (address["province"] == "" || address["city"] == "" || address["district"] == "") {
            mbox("请选择所在地区。");
            return false;
        }
        else if (trim(address["detail"]).length > 300) {
            mbox("详细地址只能输入300个字（包括标点符号空格等）。");
            return false;
        }
        else if (trim(address["detail"]).length <= 0) {
            mbox("为了方便快递快速到达您的手中，请认真填写详细地址。");
            return false;
        }
        else if (trim(address["zip"]).length <= 0 || isNaN(address["zip"])) {
            mbox("为了方便快递快速到达您的手中，请认真填写邮政编码。");
            return false;
        }
        else if (trim(address["consignee"]).length <= 0) {
            mbox("不填写收货人，我们不知道是寄给谁的。");
            return false;
        }
        else if (trim(address["mobile"]).length <= 0 && trim(address["phone"]).length <= 0) {
            mbox("没有可以联系的手机号码或者电话号码。");
            return false;
        }
        else if (trim(address["mobile"]).length > 0 && !/^1\d{10}$/.test(address["mobile"])) {
            mbox("您确定填写的手机号码是正确的吗？");
            return false;
        }
        else if (trim(address["phone"]).length > 0 && !/^0\d{2,3}-?\d{7,8}$/.test(address["phone"])) {
            mbox("您确定填写的电话号码格式对吗？（如02088888888,010-88888888,0955-7777777）");
            return false;
        }
        else
            return true;
    };
    $("#btn_add_new_address").click(function () {
        var $parent=$("#input_address_info").parent();
        var tmpHTML = $("#input_address_info").prop("outerHTML");
        $("#input_address_info").remove();
        mbox(tmpHTML, function () {
            $parent.append(tmpHTML);
            return true;
        });
        area.Init();

        $("#input_address_info").show();

    });
    $("body").delegate(".discount","click", function (e) {
        e.stopPropagation();
        stopDefault();
        var form = "#addrress_form";
        //address.Init(form);
        if(!address.validate(form)) return false;
        $btn = $(this);
        $btn.button('saving');
        $.post("/user/ajax_address/",
            $(form).serialize(),
            function (data) {
                $btn.button('reset');
                mbox(data.msg, function () {
                    location.reload();
                });
            },
            "json"
        );
    });
    $("body").delegate(".address_save","click", function () {
        var form = "#addrress_form";
        //address.Init(form);

        if(!address.validate(form)) return false;

        $btn = $(this);
        $btn.button('saving');
        $.post("/user/ajax_address/",
            $(form).serialize(),
            function (data) {
                $btn.button('reset');
                if (!data.err) {
                    var table_row = "<tr>" +
                        "<td>" + data.item.address_consignee + "</td>" +
                        "<td>" + data.item.address_area + "</td>" +
                        "<td>" + data.item.address_detail + "</td>" +
                        "<td>" + data.item.address_zip + "</td>" +
                        "<td>" + data.item.address_mobile + "<br>" + data.item.address_phone + "</td>" +
                        "<td>";
                    if (data.item.address_default) {
                        $(".default-address").addClass("btn-orange  set-default-address").removeClass(" btn-link default-address").val("设为默认");
                        table_row += "<input class=\"btn btn-xs btn-link default-address\" disabled=\"disabled\" type=\"button\" value=\"默认收货地址\" />&nbsp;"
                    }
                    else {
                        table_row += "<input class=\"btn btn-xs btn-orange set-default-address\" type=\"button\" value=\"设为默认\" />&nbsp;"
                    }
                    table_row += "<input class=\"btn btn-xs btn-lblue  lwhite\" type=\"button\" value=\"修改\" />&nbsp;<input class=\"btn btn-xs btn-red\" type=\"button\" value=\"删除\" /></td></tr>";
                    $("table").append(table_row);
                }
                mbox(data.msg, function () {
                    $("#addrress_form")[0].reset();
                    area.ClearProvince();
                    area.LoadProvince();
                    $btn.parents("div.bootbox").find("button.bootbox-close-button").click();	//关闭当前bootbox
                    window.location.reload();
                });
                window.location.reload();
                //if($("#btn_create_new_address")){alert("btn_create_new_address");}

            },
            "json"
        );
    });
    $(".set-default-address,.default-address").each(function (i, item) {
        $(item).on("click", function () {
            $this = $(this);
            var id = $this.parent().data("address-id");
            if ($this.hasClass("default-address")) {
                return false;
            }
            $.post("/user/ajax_set_default_address/" + id + ".htm",
                function (data) {
                    if (!data.err) {
                        $(".default-address").addClass("btn-danger set-default-address").removeClass(" btn-link default-address").html("设为默认");
                        $this.removeClass("btn-danger set-default-address").addClass(" btn-link default-address").html("默认收货地址");
                    }
                    mbox(data.msg, function () {
                        hideMbox();
                        return false
                    });
                },
                "json"
            );
        });
    });
    $(".modify-address").each(function (i, item) {
        $(item).on("click", function () {
            $this = $(this);
            $id = $this.parent().data("address-id");
            var $parent=$("#input_address_info").parent();
            var tmpHTML = $("#input_address_info").prop("outerHTML");
            $("#input_address_info").remove();
            mbox(tmpHTML, function () {
                $parent.append(tmpHTML);
                //$(".receiving").append(tmpHTML);
                return true;
            });
            $.get("/user/ajax_get_address/" + $id + ".htm", function (data) {
                if (data.err) {
                    mbox(data.msg);
                }
                else {
                    $("#addrress_form #country").html(data.item.address_country_text + " <span class=\"caret\"></span>");
                    $("#addrress_form input[name=country]").val(data.item.address_country);

                    $("#addrress_form #province").html(data.item.address_province_text + " <span class=\"caret\"></span>");
                    $("#addrress_form input[name=province]").val(data.item.address_province);

                    $("#addrress_form #city").html(data.item.address_city_text + " <span class=\"caret\"></span>");
                    $("#addrress_form input[name=city]").val(data.item.address_city);

                    $("#addrress_form #district").html(data.item.address_district_text + " <span class=\"caret\"></span>");
                    $("#addrress_form input[name=district]").val(data.item.address_district);

                    $("#addrress_form textarea[name=detail]").val(data.item.address_detail);

                    $("#addrress_form input[name=zip]").val(data.item.address_zip);

                    $("#addrress_form input[name=consignee]").val(data.item.address_consignee);

                    $("#addrress_form #mobile_area").html(data.item.address_mobile_area_text + " <span class=\"caret\"></span>");
                    $("#addrress_form input[name=mobile_area]").val(data.item.address_mobile_area);
                    $("#addrress_form input[name=mobile]").val(data.item.address_mobile);

                    $("#addrress_form #phone_area").html(data.item.address_phone_area_text + " <span class=\"caret\"></span>");
                    $("#addrress_form input[name=phone_area]").val(data.item.address_phone_area);
                    $("#addrress_form input[name=phone]").val(data.item.address_phone);
                    if (data.item.address_default == 1)
                        $("#addrress_form input[name=default]").prop("checked", "checked");

                    area.Init();
                }
            }, "json")
            $(".address_save").unbind("click");
            $(".address_save").on("click", function (e) {
                e.stopPropagation();
                stopDefault();
                var form = "#addrress_form";
                if(!address.validate(form)) return false;
/*                address.Init(form);
                if (address["province"] == "" || address["city"] == "" || address["district"] == "") {
                    mbox("请选择所在地区。");
                    return false;
                }
                else if (trim(address["detail"]).length > 300) {
                    mbox("详细地址只能输入300个字（包括标点符号空格等）。");
                    return false;
                }
                else if (trim(address["detail"]).length <= 0) {
                    mbox("为了方便快递快速到达您的手中，请认真填写详细地址。");
                    return false;
                }
                else if (trim(address["zip"]).length <= 0 || isNaN(address["zip"])) {
                    mbox("为了方便快递快速到达您的手中，请认真填写邮政编码。");
                    return false;
                }
                else if (trim(address["consignee"]).length <= 0) {
                    mbox("不填写收货人，我们不知道是寄给谁的。");
                    return false;
                }
                else if (trim(address["mobile"]).length <= 0 && trim(address["phone"]).length <= 0) {
                    mbox("没有可以联系的手机号码或者电话号码。");
                    return false;
                }
                else if (trim(address["mobile"]).length > 0 && !/^1\d{10}$/.test(address["mobile"])) {
                    mbox("您确定填写的手机号码是正确的吗？");
                    return false;
                }
                else if (trim(address["phone"]).length > 0 && !/^0\d{2,3}-?\d{7,8}$/.test(address["phone"])) {
                    mbox("您确定填写的电话号码格式对吗？（如02088888888,010-88888888,0955-7777777）");
                    return false;
                }*/
                $btn = $(this);
                $btn.button('saving');
                $.post("/user/ajax_address/" + $id + ".htm",
                    $(form).serialize(),
                    function (data) {
                        $btn.button('reset');
                        mbox(data.msg, function () {
                            location.reload();
                            //hideMbox();
                        });
                    },
                    "json"
                );
            });
            $("#input_address_info").show();
        });
    });
    $(".del-address").each(function (i, item) {
        $this = $(item);
        var id = $this.parent().data("address-id");
        $this.on("click", function () {
            if (confirm("确定要删除该收货地址？")) {
                $.post("/user/ajax_del_address/", "id=" + id, function (data) {
                    mbox(data.msg,function(){
                        location.reload();
                    });
                }, "json")
            }
        });
    });

    //same 韩剧列表 peripherals  图片切换
    var xsize,ysize;
/*    $('.peripherals a div').each(function (i, item) {
        var $thisItem = $(item).children("img");
        imgLoaded($thisItem,cb,{"$thisItem":$thisItem,"item":item});
    });*/
    $('.peripherals a div').each(function (i, item) {
        var $thisItem = $(item).children("img");
        $thisItem.load(function(){
            cb({"$thisItem":$thisItem,"item":item});
        });
    });
    function cb (params) {
        if (!xsize || !ysize) {
            xsize = params.$thisItem.width();
            ysize = params.$thisItem.height();
        }
        params.$thisItem.parent().css({
            "overflow": "hidden",
            "width": xsize+"px",
            "height": ysize+"px",
            "display": "block"
        });
        $(params.item).hover(
            function () {
                var param = params.$thisItem.data("param");
                var second = params.$thisItem.data("second");

                if (param instanceof Object) {
                    if ("undefined" == typeof param.size || "undefined" == typeof param.print_point || "undefined" == typeof param.points)
                        return false;
                    var boundx = param.size[0], boundy = param.size[1];
                    var rx = xsize / (param.print_point[2] - param.print_point[0]);
                    var ry = ysize / (param.print_point[3] - param.print_point[1]);

                    params.$thisItem.prop("src", second);

                    params.$thisItem.css({
                        width: Math.round(rx * boundx) + 'px',
                        height: Math.round(ry * boundy) + 'px',
                        marginLeft: '-' + Math.round(rx * param.print_point[0]) + 'px',
                        marginTop: '-' + Math.round(ry * param.print_point[1]) + 'px',
                        "max-width": "none"
                    });


                    $.each(param.points, function (i, point) {
                        var div = document.createElement("div");
                        var left = Math.round(rx * (point["left"] - param.print_point[0]) + 7);
                        var top = Math.round(ry * (point["top"] - param.print_point[1]) - 7);
                        if (left > 0 && left < xsize && top > 0 && top < ysize) {
                            $(div).css({"left": left, "top": top});
                            $(div).removeAttr("class").addClass("mark").addClass(point["color"]);
                            params.$thisItem.parent().append($(div));
                        }
                    });
                    /*
                     twinkle(1);
                     function twinkle(i) {
                     i=parseInt(i);
                     if(isNaN(i)||i>10) i=0;
                     $(".mark").animate({"opacity": 1/i++}, 50,function(){
                     twinkle(i);
                     });
                     }*/
                }
            },
            function () {
                params.$thisItem.css({
                    width: '100%',
                    height:  'auto',
                    marginLeft: '0px',
                    marginTop: '0px',
                    "max-width": "100%",
                    "display": "block"
                });
                params.$thisItem.parent().find("div").remove();
                var first = params.$thisItem.data("first");
                params.$thisItem.prop("src", first);
            }
        );
    }

    //选择材质，尺寸
    $(".order_detail .style a.btn,.order_detail .size a.btn,.order_detail .color a.btn").click(function () {
        var $this = $(this);
        var opts={id:0,style:null,size:null,color:null};
        $this.parent().children().removeClass("active");
        $this.addClass("active");
        $this.children("input").prop("checked",true);

        opts.id=$(".buy").data("id");
        opts.style=$(".style input[type=radio][name=style]:checked").eq(0).val();
        opts.size=$(".size input[type=radio][name=size]:checked").eq(0).val();
        opts.color=$(".color input[type=radio][name=color]:checked").eq(0).val();

        if (opts.id != 0 && opts.style != null && opts.size != null&& opts.color != null)
            $.post("/same/show_price/", {
                id: opts.id,
                style: opts.style,
                size: opts.size,
                color: opts.color
            }, function (data) {
                if (data.success) {
                    opts["price"] = data.price;
                    opts["s_price"] = data.s_price;
                    $('.price').text("￥"+data.price + "元");
                }
                else {
                    opts["price"] = 0;
                    opts["price"] = 0;
                    $('.price').text("暂无价格");
                }
            }, "json");
        else
            $('.price').text("暂无价格");
    });
    if($(".order_detail .style a.btn").length>0)
        $(".order_detail .style a.btn")[0].click();
    if($(".order_detail .size a.btn").length>0)
        $(".order_detail .size a.btn")[0].click();
    if($(".order_detail .color a.btn").length>0)
        $(".order_detail .color a.btn")[0].click();
    //增加数量
    $(".order_detail i.add").click(function () {
        var val=parseInt($(".order_detail input[name=num]").val());
        if(!isNaN(val))
            $(".order_detail input[name=num]").val(val+1);
    });
    //减少数量
    $(".order_detail i.subtract").click(function () {
        var val=parseInt($(".order_detail input[name=num]").val());
        if(!isNaN(val)) {
            val = val - 1;
            if (val>0)
                $(".order_detail input[name=num]").val(val);
            else
                $(".order_detail input[name=num]").val(0);
        }
    });
    //自定义数量
    $(".order_detail input[name=num]").change(function(){
        var val=parseInt($(".order_detail input[name=num]").val());
        if(!isNaN(val))
            $(".order_detail input[name=num]").val(val);
        else
            $(".order_detail input[name=num]").val(0);
    });
    $(".t_switch_menu li a").on("click", function (e) {
        e.preventDefault();
        var $this=$(this);
        var href= $this.prop("href").split("#");
        href=href[href.length-1];
        $("#"+href).parent().children().removeClass("in active");
        $("#"+href).addClass("in active");
        $this.parent().nextAll().removeClass("active");
        $this.parent().prevAll().removeClass("active");
        $this.parent().addClass("active");
    });
    //加入购物车
    $("#addShoppingCart").on("click", toBuy);
    //立即购买
    $("#buyStepFrist").on("click", function () {
        toBuy(function(){location.href="/same/shopping_cart/"});
    });
    function toBuy () {
        var callback=arguments[0];
        var opts={id:0,style:null,size:null,num:0};
        opts.id=$(".buy").data("id");
        opts.style=$(".style input[type=radio][name=style]:checked").eq(0).val();
        opts.size=$(".size input[type=radio][name=size]:checked").eq(0).val();
        opts.color=$(".color input[type=radio][name=color]:checked").eq(0).val();
        opts.num=$(".order_detail input[name=num]").val();
        if (opts.id > 0 && opts.style != null && opts.size != null&& opts.color != null&&opts.num>0)
            $.post("/same/add_shopping_cart/", opts, function (data) {
                if( typeof callback === 'function' ){
                    callback();
                }
                else {
                    mbox(data.msg);
                }

            }, "json");
        else
            mbox("请选择材质，尺寸和填写购习数量！");
    }
    //购物车页面操作
    var select_count= 0,total_price=0;
    $(".my_cart").on("click", "#select_all", function () {
        total_price=$("#total_price").text()*100;
        if ($(this).is(':checked')) {
            if( $("input[name='select']:checked").length != $("input[name='select']").length) {
                select_count = $("input[name='select']").length;
                total_price=0;
                $("input[name='select']").each(function (i, item) {
                    total_price += $(item).parent().siblings(".yuan").children(".price").text() * 100;
                });
                $("input[name='select']").prop("checked", 'true');//全选
            }
        }
        else {
            select_count = 0;
            total_price=0;
            $("input[name='select']").removeAttr("checked");//全不选
        }
        $("#select_count").html(select_count);
        $("#total_price").html(total_price/100);
    });
    $(".my_cart").on("change", "input[name='select']", function () {
        total_price=$("#total_price").text()*100;
        if ($(this).is(':checked')) {
            select_count++;
            total_price+=$(this).parent().siblings(".yuan").children(".price").text()*100;
        }
        else {
            select_count--;
            total_price-=$(this).parent().siblings(".yuan").children(".price").text()*100;
        }
        $("#select_count").html(select_count);
        $("#total_price").html(total_price/100);
    });
    $(".my_cart").on("click", ".del_shopping", function (){
        var $this=$(this);
        bootbox.setLocale("zh_CN");
        bootbox.confirm("确定要把该商品移出购物车吗？",function(result){
            if(result) {
                var sc_id = $this.data("sc-id");
                $.get("/same/remove_shopping_cart/" + sc_id + ".htm",
                    function (data) {
                        if(data.success)
                        {
                            $this.parent().parent().remove();
                            mbox("成功移出购物车！",function(){
                                location.reload();
                            });
                        }
                    },
                    "json");
            }
        });

    });
    $(".my_cart").on("click",".toOrder",function(){
        var $btn=$(this);
        $btn.button("saving");
        select=[];
        $("input[name='select']").each(function(){
            if ($(this).is(':checked')) {
                select.push($(this).val());
            }
        });
        coupon=$("input[name=use_coupon]:checked").length;
        if(select.length) {
            var paramStr = "sc_id_arr=" + select.join(",");
            location.href="/same/shopping_cart_step/?" + paramStr+"&coupon="+coupon;
            //mbox(":/same/shopping_cart_step/?" + paramStr);
        }
        else
        {
            $btn.button("reset");
            mbox("在您的购物车中，没有选中任何一件商品喔！！！");
        }
    });
    //添加新收货地址
    $("body").delegate("#btn_create_new_address","click",function(){
        loadAddNewAddress();
    });
    var loadAddNewAddress=function(){
        $(".mbox_page").parents("div.bootbox.modal.fade.in").css({"z-index":"0"});
        mbox(":/user/create_address/",function(){
            var creatingAddress;
            creatingAddress=window.setInterval(function(){
                $("body").addClass("modal-open");
                $(".mbox_page").parents("div.bootbox.modal.fade.in").css({"z-index":"1050"});
                window.clearInterval(creatingAddress);
            }, 500);
        });

    };
/*    //确认订单去付款
    $(".my_cart .topay").on("click",function(e){
        e.stopPropagation();
        stopDefault();

        var $this=$(this);
        var id=$this.data("id");
        var href=$this.data("href");
        var address_id=$(".my_cart  [name=address_id]:checked").eq(0).val();
        var payment=$(".my_cart  [name=payment]:checked").eq(0).val();
        var buyer_msg=$(".my_cart  [name=buyer_msg]").val();
/!*        console.log({"id":id,"address_id":address_id,"payment":payment,"buyer_msg":buyer_msg});
        return false;*!/
        $.post("/same/order_pay/",{"id":id,"address_id":address_id,"payment":payment,"buyer_msg":buyer_msg},function(data){
            if (null != data.login && !data.login) {
                mbox("您还没有登陆喔...", "", "去登陆", function () {
                    location.href="/user/login/";
                    /!*mbox(":/user/ajax_login/", "", "", "", false);*!/
                });
            }
            else if (data.err==0) {
                //mbox(data.msg);
                $("#alipaySubmit").submit();
                //location.href=href;
                // window.open(href,"newwindow");
            }
        },"json");
    });*/
    //秀同款
    $(".show-peripherals").each(function(){

        $(this).on("click",function(){
            var $this=$(this);

            var pid=$this.data("pid");
            var oi_id=$this.data("oi-id");
            var od_id=$this.data("od-id");

                //秀一秀
                var peripherals_img= $this.parents("tr").children("td").children("img").prop("src");
                var peripherals_title=$this.parents("tr").children("td")[1].innerText;
                peripherals_img=peripherals_img.replace("80-80","300-300");
                $("#peripherals_img").prop("src",peripherals_img);
                $("#peripherals_title").text(peripherals_title);
                $(".show_times .post").on("click",function(){
                    var file_upload1=$("#file_upload1").val();
                    var file_upload2=$("#file_upload2").val();
                    var file_upload3=$("#file_upload3").val();
                    var file_upload3=$("#file_upload3").val();
                    var content=$("#content").val();
                    if(file_upload1.length<=1||file_upload2.length<=1||file_upload3.length<=1)
                    {
                        mbox("请上传三张照片");
                        return false;
                    }
                    if(content.length<5)
                    {
                        mbox("一句话，至少也地要有5个字吧！");
                        return false;
                    }
                    if(content.length>300)
                    {
                        mbox("不是写作文喔，不用写超过300个字符的！");
                        return false;
                    }
                    $("input[name=pid]").val(pid);
                    $("input[name=oi_id]").val(oi_id);
                    $("input[name=od_id]").val(od_id);
                    $("form[name=buyer_show_post_form]").submit();
                });

                $(".buyer_show_list").hide();
                $(".show_times").show();

        })
    });
    //个人中心 删除订单
    $(".order_status").on("click",function(){
        var $btn=$(this);
        var id=$btn.data("id");
        bootbox.setLocale("zh_CN");
        bootbox.confirm("确定要删除该订单吗？",function(result) {
            if(result)
            {
                mbox(":/user/del_order/?id="+id,function(){location.reload();});
            }
        });

    });

    $("form[name=avatar_form] #save_avatar").on("click",function(){
        var nickname=$("form[name=avatar_form] input[name=nickname]").val();
        if(nickname.length>0)
        {
            $(this).button("saving");
            $("form[name=avatar_form]").submit();
        }
        else
            mbox("昵称不能为空！");
    });
    $("form[name=password_form] #save_password").on("click",function(){
        var pwd=$("form[name=password_form] input[name=oldpassword]").val();
        var pwd1=$("form[name=password_form] input[name=newpassword]").val();
        var pwd2=$("form[name=password_form] input[name=newpasswordc]").val();
        if(pwd.length<=0)
        {
            mbox("请输入您的密码！");
            return false;
        }
        else if(pwd1.length<=5)
        {
            mbox("请确认新密码长度大于5个字符！");
            return false;
        }
        else if(pwd1.length>32)
        {
            mbox("新的密码太长了，不方便记忆，请更换一个！");
            return false;
        }
        else if(pwd1!=pwd2)
        {
            mbox("新密码与确认密码不相同！");
            return false;
        }
        else
        {
            $(this).button("saving");
            $("form[name=password_form] input[name=oldpassword]").val(md5(pwd));
            $("form[name=password_form] input[name=newpassword]").val(md5(pwd1));
            $("form[name=password_form] input[name=newpasswordc]").val(md5(pwd2));
            $("form[name=password_form]").submit();
        }
    });
    $("form[name=email_form] #save_email").on("click",function() {
        var pwd=$("form[name=email_form] input[name=pwd]").val();
        var email=$("form[name=email_form] input[name=email]").val();
        if(!/^\w+((-\w+)|(.\w+))*@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+)*.[A-Za-z0-9]+$/.test(email))
        {
            mbox("请输入符合Email格式的邮箱地址！");
            return false;
        }
        else if(pwd.length==0) {
            mbox("修改邮箱，请输入登陆密码！");
            return false;
        }
        else if(pwd.length<6) {
            mbox("请确认密码长度大于5个字符！");
            return false;
        }
        $(this).button("saving");
        pwd = md5(pwd);
        $("form[name=email_form] input[name=pwd]").val(pwd);
        $("form[name=email_form]").submit();
    });
    $("form[name=send_form] #save_send").on("click",function() {
        $(this).button("saving");
        $("form[name=send_form]").submit();
    });
    $("form[name=alipay_form] #save_alipay").on("click",function() {
        var pwd=$("form[name=alipay_form] input[name=pwd]").val();
        var alipay=$("form[name=alipay_form] input[name=alipay]").val();
        if(!/^\w+((-\w+)|(.\w+))*@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+)*.[A-Za-z0-9]+$/.test(alipay)&&!/^1[0-9]{10}$/.test(alipay))
        {
            mbox("请输入符合格式的支付宝账号！");
            return false;
        }
        else if(pwd.length==0) {
            mbox("修改支付宝账号，请输入登陆密码！");
            return false;
        }
        else if(pwd.length<6) {
            mbox("请确认密码长度大于5个字符！");
            return false;
        }
        $(this).button("saving");
        pwd = md5(pwd);
        $("form[name=alipay_form] input[name=pwd]").val(pwd);
        $("form[name=alipay_form]").submit();
    });

    $("form[name=extract_form] #extract").on("click",function() {
        var pwd = $("form[name=extract_form] input[name=pwd]").val();
        var amount = parseInt($("form[name=extract_form] input[name=amount]").val());
        var max = $("form[name=extract_form] input[name=amount]").prop("max");
        var alipay = $("form[name=extract_form] input[name=alipay]").val();

        if (!/^\w+((-\w+)|(.\w+))*@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+)*.[A-Za-z0-9]+$/.test(alipay) && !/^1[0-9]{10}$/.test(alipay)) {
            mbox("请绑定符合格式的支付宝账号！");
            return false;
        }
        else if (pwd.length == 0) {
            mbox("提现到支付宝账号，需要输入本站登陆密码！");
            return false;
        }
        else if (pwd.length < 6) {
            mbox("请确认密码长度大于5个字符！");
            return false;
        }
        else if(isNaN(amount)||parseInt(amount)<1)
        {
            mbox("请输入提现金额");
            return false;
        }
        else if(parseInt(amount)>parseInt(max)){
            mbox("提现金额不能超过可提现额");
            return false;
        }

        $(this).button("saving");
        pwd = md5(pwd);
        $("form[name=extract_form] input[name=pwd]").val(pwd);
        $("form[name=extract_form]").submit();
    });

    //明星列表滚动
    $('.arrow_top').on("click",function(){

        Marquee(0);
    });
    $('.arrow_down').on("click",function(){
        Marquee(1);
    });
    function Marquee(f){
        if(f==0) {
            var tab = $(".l_small_pics_ls");
            var tab1 = $(".l_small_pics_item");
            tab.scrollTop(tab.scrollTop()-45);

        }
        else if(f==1)
        {
            var tab = $(".l_small_pics_ls");
            var tab1 = $(".l_small_pics_item");
            tab.scrollTop(tab.scrollTop()+45);
        }
    }

    //首页花猫头条slider
    $(".i_block_21_fl a").hover(function(){$(".i_block_21_fl").toggleClass("i_block_21_fl_hover");},function(){$(".i_block_21_fl").toggleClass("i_block_21_fl_hover");});

    //same 韩剧列表->同款信息 peripherals_picture 视频大图标签
    imgLoaded($('.peripherals_picture img'),peripherals_picture_resize,$('.peripherals_picture img'));
    //二维码定位
    onResize(QR_code_resize);

    //页面尺寸改变时，重新执行
    $(window).resize(function () {
        imgLoaded($('.peripherals_picture img'),peripherals_picture_resize,$('.peripherals_picture img'));
        onResize(QR_code_resize);
    });
});

function needLogin()
{
    mbox("您还没有登陆，请先<a href=/user/login/ >登陆</a>，如果没有账号，请<a href=/user/register/ >注册</a>");
}

function onResize(){
    for(var i=0;i<arguments.length;i++)
    {
        if("function" == typeof arguments[i])
        {
            arguments[i]();
        }
    }
}

function imgLoaded($img,callback,params){
    if($img.height <50||$img.width < 50){
        setTimeout(function(){
            imgLoaded($img,callback,params);
        },100);
    }
    else
    {
        callback(params);
    }
}

//same 韩剧列表->同款信息 peripherals_picture 视频大图加载后回调
/*function peripherals_picture_loaded(callback){
    if($('.peripherals_picture img').height === 0){
        setTimeout(function(){
            peripherals_picture_loaded(callback);
        },500);
    }
    else
    {
        callback($('.peripherals_picture img'));
    }
}*/
//视频大图标签位置计算
function peripherals_picture_resize()
{
    var $img = arguments[0];
    var $this = $img.parent();
    var param = $this.data("param");
    var xsize= 0,ysize=0;
    if(!xsize||!ysize)
    {
        xsize= $img.width();
        ysize= $img.height();
    }
    $img.parent().find("div").remove();
    if (param instanceof Object) {
        if ("undefined" == typeof param.size || "undefined" == typeof param.print_point || "undefined" == typeof param.points)
            return false;
        var boundx = param.size[0], boundy = param.size[1];
        var rx = xsize / boundx;
        var ry = ysize / boundy;
        /*            console.log("xsize="+xsize+";  " +
         "ysize="+ysize+";  " +
         "boundx="+boundx+";  " +
         "boundy="+boundy+";  " +
         "rx="+rx+";  " +
         "ry="+ry+";  " +"");*/
        $.each(param.points, function (i, point) {
            var div = document.createElement("div");
            var left = Math.round(rx * point["left"]);
            var top = Math.round(ry * point["top"]);
            if (left > 0 && left < xsize && top > 0 && top < ysize) {
                $(div).css({"left": left+7, "top": top-7});
                $(div).removeAttr("class").addClass("mark").addClass(point["color"]);
                /*console.log($(div));*/
                $img.parent().append($(div));
                $text=createTarget(left+20,top-10,point["color"],point["text"]);
                $img.parent().append($text);
            }
        });
    }

    function createTarget(left,top,color,text) {
        var input_text="";
        if(typeof text == "string")
            input_text=text;

        var txtTarget = '<div class="target ' + color + '" style="position: absolute;left:10px;' +
            'background-color:rgba(255,255,255,0.15);' +
            'padding:3px;">' +input_text+'</div>';

        var $objTarget = $(txtTarget);

        $objTarget.css({
            "left": left,
            "top": top
        });
        $img.parent().append($objTarget);
        $objTarget.data("obj", $objTarget);
        return $objTarget;
    };

}

//二维码位置计算
function QR_code_resize(){
    var w_width = $(".QR-code").parent().width();
    var d_width =$(".QR-code").width();
    //alert(w_width+"   "+d_width );
    $(".QR-code").css({"left":(w_width-d_width-20)/2});
}

//全国地区三级联动
var area ={};
area.ClearDistrict = function () {
    $("input[name=district]").val("");
    $("#district_list").html("");
    $("#district").html("区 <span class=\"caret\"></span>");
};
area.ClearCity = function () {
    $("input[name=city]").val("");
    $("input[name=district]").val("");
    $("#city_list").html("");
    $("#city").html("市 <span class=\"caret\"></span>");
    $("#district_list").html("");
    $("#district").html("区 <span class=\"caret\"></span>");
};
area.ClearProvince = function () {
    $("input[name=province]").val("");
    $("input[name=city]").val("");
    $("input[name=district]").val("");
    $("#province_list").html("");
    $("#province").html("省 <span class=\"caret\"></span>");
    $("#city_list").html("");
    $("#city").html("市 <span class=\"caret\"></span>");
    $("#district_list").html("");
    $("#district").html("区 <span class=\"caret\"></span>");
};
area.LoadDistrict = function (city) {
    $(areas.district).each(function (district_i, district_item) {
        if (String(district_item.id).substr(0, 4) == city) {
            var li = "<li><a data-value=\"" + district_item.id + "\">" + district_item.text + "</a></li>";
            $("#district_list").append($(li).on("click", function () {
                $district_list = $(this).children("a");
                area.district = {};
                area.district.id = $district_list.data("value");
                area.district.text = $district_list.text();
                $("input[name=district]").val($district_list.data("value"));
                $("#district").html($district_list.text() + "<span class=\"caret\"></span>");
            }));
        }
    });
}
area.LoadCity = function (province) {
    $(areas.city).each(function (city_i, city_item) {
        if (String(city_item.id).substr(0, 2) == province) {
            var li = "<li><a data-value=\"" + city_item.id + "\">" + city_item.text + "</a></li>";
            $("#city_list").append($(li).on("click", function () {
                $city_item = $(this).children("a");
                area.city = {};
                area.city.id = $city_item.data("value");
                area.city.text = $city_item.text();
                $("input[name=city]").val($city_item.data("value"));
                $("#city").html($city_item.text() + "<span class=\"caret\"></span>");
                area.ClearDistrict();
                var city = String(area.city.id).substr(0, 4);
                area.LoadDistrict(city);
            }));
        }
    });
}
area.LoadProvince = function () {
    $(areas.province).each(function (province_i, province_item) {
        var li = "<li><a data-value=\"" + province_item.id + "\">" + province_item.text + "</a></li>";
        $("#province_list").append($(li).on("click", function () {
            $province_item = $(this).children("a");
            area.province = {};
            area.province.id = $province_item.data("value");
            area.province.text = $province_item.text();
            $("input[name=province]").val($province_item.data("value"));
            $("#province").html($province_item.text() + "<span class=\"caret\"></span>");
            area.ClearCity();
            var province = String(area.province.id).substr(0, 2);
            area.LoadCity(province);
        }));
    });
};
area.Init = function () {
    if ("object" == typeof areas) {
        var province = $("#addrress_form input[name=province]").val().substr(0, 2);
        var city = $("#addrress_form input[name=city]").val().substr(0, 4);
        area.LoadProvince();
        if (province)
            area.LoadCity(province);
        if (city)
            area.LoadDistrict(city);
    }
    else {
        mbox("Error:没有提供所在地区数据！请与管理员联系！");
        return false;
    }
    $("#province").click(function () {
        if (areas.province.length < 1)
            mbox("没有加载到任何省数据");
        else if ($("#province_list li").length < 1)
            mbox("省市数据加载错误，请与管理员联系！");
    });
    $("#city").click(function () {
        if (areas.city.length < 1)
            mbox("没有加载到任何市数据");
        else if ($("#city_list li").length < 1)
            mbox("您还没有选择所在省吧，请先选择省，再来选市！");
    });
    $("#district").click(function () {
        if (areas.district.length < 1)
            mbox("没有加载到任何区数据");
        else if ($("#district_list li").length < 1)
            mbox("您还没有选择所在省市吧！");
    });

};

//过滤字符串前后空格
function trim(str) {
    return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

//JS阻止链接跳转
function stopDefault( e ) {
    if ( e && e.preventDefault )
        e.preventDefault();
    else
        window.event.returnValue = false;

    return false;
}
//选择文件点击
function selectFile(file_ctl_id){
    document.getElementById(file_ctl_id).click();
}
//花猫卖场页面 -单元素支持
(function($) {
    $.extend({
        "top3Selling":function(selling_goods) {
            var selling = selling_goods[0];
            showCountDown(selling);
            $(".show_selling img").on("click", function () {
                var $this = $(this);
                var index = $this.data("index");
                $(".countdown").showCountDown("stop");
                if (selling_goods[index]) {
                    selling = selling_goods[index];
                    $(".big-img").prop("src", selling["peripherals_products_img_300_300"]);
                    $(".countdown").showCountDown("setParam",{"endTime": selling["peripherals_end_time"]});
                }
            });
        }
    });
    function showCountDown(selling) {
        $(".countdown").showCountDown({
            "endTime": selling["peripherals_end_time"],
            /*"leftSecond":5000,*/
            "daySelector": "#day",
            "hourSelector": "#hour",
            "minuteSelector": "#minute",
            "secondSelector": "#second"
        }, 1000);
    }
})(window.jQuery);

//判断浏览器版本插件，对不适用的版本进行提示升级
(function($){
    $.extend({
        "tipBrowserUpgrade":function(){
            var bro=$.browser;
            var binfo="";
            if(bro.msie) {
                binfo="Microsoft Internet Explorer "+bro.version;
                if(bro.version<9){
                    $("body").css({"padding-top":0});
                    $(".navbar-fixed-top").removeClass("navbar-fixed-top");
                    $("#tipBrowserUpgrade").show();
                }
            }
            if(bro.mozilla) {binfo="Mozilla Firefox "+bro.version;}
            if(bro.safari) {binfo="Apple Safari "+bro.version;}
            if(bro.opera) {binfo="Opera "+bro.version;}
            if(bro.chrome) {binfo="Google Chrome "+bro.version;}
        }
    });
})(window.jQuery);

//倒计时插件 -多元素支持
(function(window,$){
    var defaults={
        "auto":true,
        "interval":1000,
        "endTime":null,
        "leftSecond":null,
        "daySelector":".day",
        "hourSelector":".hour",
        "minuteSelector":".minute",
        "secondSelector":".second"
    };

    $.fn.extend({
        "showCountDown":function(options,param){
            var lists = this, retval = this;
            lists.each(function () {
                var plugin = $(this).data("countDown");
                if (!plugin) {
                    $(this).data("countDown", new Plugin(this,options));
                    $(this).data("countDown-id", new Date().getTime());
                } else {
                    if (typeof options === 'string' && typeof plugin[options] === 'function') {
                        retval = plugin[options](param);
                    }
                }
            });
            return retval || lists;
        }
    });

    $.fn.countDownFormat=function(obj){
        //console.log("countDownFormat   "+obj.options.leftSecond);
    };
    $.fn.countDownEndFormat=function(obj){
        //console.log(obj);
        var thisObj=obj;
        thisObj.element.find(thisObj.options.daySelector).text("00").removeClass("yellow").addClass("black");
        thisObj.element.find(thisObj.options.hourSelector).text("00").removeClass("yellow").addClass("black");
        thisObj.element.find(thisObj.options.minuteSelector).text("00").removeClass("yellow").addClass("black");
        thisObj.element.find(thisObj.options.secondSelector).text("00").removeClass("yellow").addClass("black");
        //thisObj.element.css({"background-color": "#ddd"});
    };
    function Plugin(element,options) {
        this.time=null;
        this.element=$(element);
        this.options = $.extend({}, defaults, options);
        this.init(this.options.auto);
    }
    Plugin.prototype={
        init:function(auto){
            var thisObj=this;
            thisObj.options.endTime=thisObj.options.endTime||thisObj.element.data("endtime");
            thisObj.options.nowTime=new Date().getTime()/1000;
            thisObj.options.leftSecond = thisObj.options.endTime - thisObj.options.nowTime;
            if(auto)
                thisObj.start();
        },
        start:function(){
            var thisObj=this;
            thisObj.run();
        },
        run:function(){
            var thisObj=this;
            thisObj.time=window.setTimeout(function(){

                if (thisObj.options.leftSecond > 0) {
                    var day = Math.floor(thisObj.options.leftSecond / (60 * 60 * 24));
                    var hour = Math.floor((thisObj.options.leftSecond - day * 24 * 60 * 60) / 3600);
                    var minute = Math.floor((thisObj.options.leftSecond - day * 24 * 60 * 60 - hour * 3600) / 60);
                    var second = Math.floor(thisObj.options.leftSecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);

                    thisObj.element.find(thisObj.options.daySelector).text(day < 10 ? "0" + day : day);
                    thisObj.element.find(thisObj.options.hourSelector).text(hour < 10 ? "0" + hour : hour);
                    thisObj.element.find(thisObj.options.minuteSelector).text(minute < 10 ? "0" + minute : minute);
                    thisObj.element.find(thisObj.options.secondSelector).text(second < 10 ? "0" + second : second);
                    thisObj.options.leftSecond--;
                    $.fn.countDownFormat(thisObj);
                    thisObj.run();
                }
                else {
                    thisObj.end();
                }
            },thisObj.options.interval)
        },
        end: function () {
            $.fn.countDownEndFormat(this);
            window.clearTimeout(this.time);
        },
        stop:function(){
            var thisObj=this;
            window.clearTimeout(thisObj.time);
        },
        setParam:function(param) {
            var thisObj=this;
            if (null != param && "object" == typeof param) {
                thisObj.options= $.extend({},thisObj.options, param);
            }
            thisObj.init(thisObj.options.auto);
        }
    }
})(window,window.jQuery);

//通过搜索插件 -单元素支持
(function($){
    $.extend({
        "searchForm":function(options){
            opts= $.extend({},defaults,options);

            Init();

            function onActive($children, $this, name) {
                $children.prop("checked", true);
                $this.val = function () {
                    return $children.val();
                };
                if (name.indexOf("[]") < 0) {
                    $("input[name=" + name + "]").each(function (i, obj) {
                        $(obj).parent().removeClass("active");
                    });
                }
                $this.addClass("active");
            }

            function unActive($children, $this) {
                $children.prop("checked", false);
                $this.val = function () {
                    return "";
                };
                $this.removeClass("active");
            }

            $("form[name=searchForm] li a").on("click",function(){
                var $this=$(this);
                var $children=$this.children();
                var name=$children.prop("name");
                onActive($children, $this, name);
                onSearch();
/*                if($children.prop("checked"))
                {
                    unActive($children, $this);
                }
                else {
                    onActive($children, $this, name);
                }*/
            });
            $(".search").on("click",onSearch);
            $("#min").on("focus",priceInput);
            $("#max").on("focus",priceInput);
            function priceInput(e)
            {
                e.preventDefault();
                e.stopPropagation();

                var $this=$(this).parent();
                var $children=$this.children("input[type=radio]");
                var name=$children.prop("name");
                if(!$children.prop("checked"))
                {
                    onActive($children, $this, name);
                }
            }
        }
    });
    var opts={};
    var defaults={
        "class":null,
        "style":[],
        "order":null,
        "status":null,
        "min":null,
        "max":null,
        "keys":null,
        "keyword":"",
    };
    var onSearch=function() {
        if(parseInt($("input[type=radio][name=order]:checked").val())==2) {
            var min=parseFloat($("#min").val());
            var max=parseFloat($("#max").val());
            if(isNaN(min))
            {
                mbox("请填写起始价格");
                return false;
            }
            if(isNaN(max))
            {
                mbox("请填写结束价格");
                return false;
            }
        }
        $("form[name=searchForm]").submit();
    };
    var target=function(text,key,value){
        //var label='<span>'+text+' </span>';
        var close='<b></b>';
        var target=document.createElement("span");
        //target.className="label label-pink";
        target.innerText=text;
        $(target).append($(close).on("click",function(){
            deleteTarget(key,value);
            $(target).remove();
        }));
        //var html='<label class="label label-pink">'+text+' </label>';
        return $(target);
    };
    var deleteTarget=function(key,value){
        switch (key)
        {
            case "style":
                $(".style input[type=checkbox]").each(function (i, obj) {
                    if($(obj).val()==value) {
                        $(obj).attr("checked",false);
                        $(obj).parent().removeClass("active");
                    }
                });
                break;
            case "class":
            case "order":
            case "status":
                $("input[name=" + key + "]").each(function (i, obj) {
                    $(obj).prop("checked", false);
                    $(obj).parent().removeClass("active");
                });
                break;
            case "keys":
                //$("select[name=keys]").find("option[value=0]").attr("selected",true);
                $("input[name=keyword]").val("");
                break;
        }
        onSearch();
    };
    var Init=function() {
        var targetBar=$(".targetBar");

        if (!!opts.class) {
            $("input[type=radio][name=class]").each(function(i,item){
                var $this=$(item);
                if(opts.class==$this.val())
                {
                    $this.prop("checked",true);
                    $this.parent().addClass("active");
                    targetBar.append(target($this.parent().text(),"class",$this.val()));
                }
            });
        }
        if (!!opts.style &&opts.style.length>0) {
            $("input[type=checkbox]").each(function (i, item) {
                var $this = $(item);
                if("string" == typeof opts.style)
                {
                    if (opts.style == $this.val()) {
                        $this.prop("checked", true);
                        $this.parent().addClass("active");
                        targetBar.append(target($this.parent().text(),"style",$this.val()));
                    }
                }
                else
                {
                    $(opts.style).each(function(j,style)
                    {
                        if (style == $this.val()) {
                            $this.prop("checked", true);
                            $this.parent().addClass("active");
                            targetBar.append(target($this.parent().text(),"style",$this.val()));
                        }
                    });
                }
            });
        }
        if (!!opts.order ) {
            $("input[type=radio][name=order]").each(function (i, item) {
                var $this = $(item);
                if (opts.order == $this.val()) {
                    $this.prop("checked", true);
                    $this.parent().addClass("active");
                    if(parseInt(opts.order)==2) {
                        targetBar.append(target("价格 "+opts.min+"-"+opts.max,"order",$this.val()));
                    }
                    else
                        targetBar.append(target($this.parent().text(),"order",$this.val()));
                }
            });
/*            switch(parseInt(opts.order))
            {
                case 2:
                    $(".price").hide();
                    $(".price_asc").hide();
                    $(".price_desc").show();
                    break;
                case 3:
                    $(".price").hide();
                    $(".price_asc").show();
                    $(".price_desc").hide();
                    break;
                default:
                    $(".price").show();
                    $(".price_asc").hide();
                    $(".price_desc").hide();
                    break;
            }*/
        }
        if (!!opts.status) {
            $("input[type=radio][name=status]").each(function(i,item){
                var $this=$(item);
                if(opts.status==$this.val())
                {
                    $this.prop("checked",true);
                    $this.parent().addClass("active");
                    targetBar.append(target($this.parent().text(),"status",$this.val()));
                }
            });
        }
        if (!!opts.min ) {
            $("input[type=text][name=min]").val(opts.min);
        }
        if (!!opts.max ) {
            $("input[type=text][name=max]").val(opts.max);
        }
        //if (!!opts.keyword) {
            //$("select[name=keys]").val(opts.keys);
            if (opts.keyword != null&&opts.keyword.length>0) {
                $("input[type=text][name=keyword]").val(opts.keyword);
                //targetBar.append(target($("select[name=keys]").find("option:selected").text()+"关键字："+opts.keyword,"keys",$("input[type=text][name=keyword]").val()));
                targetBar.append(target("关键字："+opts.keyword,"keys",$("input[type=text][name=keyword]").val()));
            }
            else
                $("input[type=text][name=keyword]").val("");

        //}
        //else {
            //$("select[name=keys]").val("");
            //$("input[type=text][name=keyword]").val("");
        //}
    };
})(window.jQuery);

//折扣进度条播件 -单元素支持
(function($){
    var defaults={

    };
    $.fn.extend({
        "discountSchedule_sample":function(){
            var args=arguments[0];
            var $lists=$(this);
            if(args.discount.length!=args.discount_day.length)
                return this;
            $lists.each(function () {
                var $this = $(this);
                var tag = '<span class="ui-slider-handle " tabindex="0"></span>';
                var now = new Date().getTime() / 1000;
                var start = 0;
                args.discount_day["discount_day1"] = new Date(args.discount_day["discount_day1"]).getTime() / 1000;
                args.discount_day["discount_day2"] = new Date(args.discount_day["discount_day2"]).getTime() / 1000;
                args.discount_day["discount_day3"] = new Date(args.discount_day["discount_day3"]).getTime() / 1000;
                if (args.discount_day["discount_day1"] < now)
                    start = args.discount_day["discount_day1"];
                else
                    start = now;
/*                console.log(args.end_time);
                console.log(start);*/

                var total = args.end_time - start;
                var left = [100, 100, 100];
                if (total > 0) {
                    left = [
                        (1 - (args.end_time - args.discount_day["discount_day1"]) / total) * 100,
                        (1 - (args.end_time - args.discount_day["discount_day2"]) / total) * 100,
                        (1 - (args.end_time - args.discount_day["discount_day3"]) / total) * 100
                    ];

                    var curr = (1 - (args.end_time - now) / total) * 100;

                    var $range = $('<div class="ui-slider-range "></div>');
                    $range.css({"left": 0, "width": curr + '%'});
                    $this.append($range);

                    var $span1 = $(tag);
                    $span1.html("<label>" + args.discount["discount1"] + "折</label>");
                    $span1.css({"left": left[0] + '%'});
                    $this.append($span1);

                    var $span2 = $(tag);
                    $span2.html("<label>" + args.discount["discount2"] + "折</label>");
                    $span2.css({"left": left[1] + '%'});
                    $this.append($span2);

                    var $span3 = $(tag);
                    $span3.html("<label>" + args.discount["discount3"] + "折</label>");
                    $span3.css({"left": left[2] + '%'});
                    $this.append($span3);


                    $this.append($(tag).css({"left": "100%"}));
                }

            });
            return this;

        },
        "discountSchedule":function() {
            var args=arguments[0];
            var $lists=$(this);
            $lists.each(function () {
                var $this=$(this);
                var schedule = $this.data("schedule");
                if (!schedule) {
                    schedule=new Schedule($this,args);
                    $this.data("schedule", schedule);
                    schedule.init();
                }
                else {
                    var methodStr = args[0];
                    var method = schedule[methodStr];
                    if (typeof methodStr === 'string' && typeof method === 'function') {
                        args = Array.prototype.slice.call(args, 1);
                        method.apply(schedule, args);
                    }
                }
            });
            return this;
        }
    });
    function Schedule()
    {
        this.$obj=arguments[0]
        this.args=arguments[1];
    }
    Schedule.prototype.init= function () {
        var $lists=this.$obj;
        var args=this.args;
        if(args.discount.length!=args.discount_day.length)
            return this;
        $lists.each(function () {
            var $this=$(this);
            var tag='<span class="ui-slider-handle " tabindex="0" style="left: 100%;"></span>';
            $.each(args.discount_day,function(i,item){
                console.log(i);

                var $span = $(tag);
                $span.html("<label>"+args.discount["discount"+(i+1)]+"</label>");
                $this.append($span);
            });
            //$this.append(tag);
        });
        return this;
    }
})(window.jQuery);



/**
 * 模块对话框
 * @param data 如果data包含http打头判定远程页面，或者:打头判定为本地
 **/
function mbox(data, title, btn_title, btn_event,showBorder,alignClass)
{
    if("string" != typeof data)
    {
        return false;
    }
	if(data.indexOf("http") == 0 || data.indexOf(":") == 0) {
		data = data.indexOf(":") == 0 ? data.replace(":", "") : data;
		var div_class = 'mbox_page';
		var div_id = 'mbox_page';
		if($(".mbox_page").length>0)
			div_id+="_"+$(".mbox_page").length;
		data = '<br><div id="'+div_id+'" class="' + div_class + '">loading..</div><script>$("#' + div_id + '").load(\'' + data + '\');</script>';
	}

	var param = {message: data,onEscape:true,backdrop:true};

	if(!$.isFunction(title))
	{
		param.title=title;
	}
	else
		param.onEscape=title;

	if(btn_title !== undefined) {
		param.buttons = {
			OK: {
				label: btn_title,
				className: "btn-primary",
				callback: btn_event
			}
		};
	}
	if(alignClass !== undefined)
	{
		param.className=alignClass;
	}
	bootbox.dialog(param);
	if(false==showBorder)
	{
		$("div.modal-content").removeClass("modal-content");
		$("button.bootbox-close-button").remove();
		$("div.modal-footer").remove();
	}
	/*    $(".bootbox.modal.fade.in").on("click",function(){
	 $(this).next().remove();
	 $(this).remove();
	 $("body").removeClass("modal-open");
	 $("body").removeAttr("style");
	 //hideMbox();
	 });   //按文档说backdrop:true时可以点背景关闭，但实现不行，只能通过此方法来实现了
	 $(".bootbox-body").click(function(){return false;});*/
}

function hideMbox()
{
	bootbox.hideAll();
}

var left_float_html, delay_show_left_float, delay_hide_left_float;	//左侧浮动栏函数
(function()		//左侧浮动栏
{
	var is_show, disable_delay_func = false;

	left_float_html = function(show, content, top, height, hidden_height, hidden_tip, bkClass, contentClass)
	{
		window.setTimeout(function()
		{
			var hidden_width = 15;

			if(height === undefined) height = "auto";
			if(hidden_height === undefined) hidden_height = "auto";

			var html = '<div left-float class="{3}" style="position:fixed; top:{1}px; left:{5}px; width:100%; height:{2};"><div switch-left-button style="float:right; margin-right:5px; cursor:pointer; width:10px; word-break: break-all;">{6}</div><div left-float-content class="{4}">{0}</div></div>'.format(
				content, top,
				(is_show = show)? height : hidden_height,
				bkClass, contentClass,
				show? 0 : hidden_width - $(window).width(),
				show? "&lt;" : (hidden_tip === undefined? "&gt;" : hidden_tip)
			);

			$("body").append(html);

			if(!show) $("div[left-float] > div[left-float-content]").hide();

			$(window).resize(function ()
			{
				if (show)
					$("div[left-float]").css("left", 0);
				else
					$("div[left-float]").css("left", hidden_width - $(window).width());
			});

			$("div[switch-left-button]").click(function ()
			{
				disable_delay_func = true;

				if (show)
				{
					show = false;

					$("div[left-float]").animate({left: hidden_width - $(window).width()}, 500, function()
												 {
													$("div[left-float] > div[left-float-content]").hide();
													$(this).css("height", hidden_height);
													$("div[switch-left-button]").html(hidden_tip === undefined? "&gt;" : hidden_tip);
												 });
				}
				else
				{
					show = true;
					$(this).html("&lt;");
					$(this).parent().css("height", height);
					$("div[left-float] > div[left-float-content]").show();
					$("div[left-float]").animate({left: 0}, 500);
				}
			});
		}, 500);
	};

	delay_show_left_float = function(second)
	{
		window.setTimeout(function()
		{
			if(!disable_delay_func && !is_show) $("div[switch-left-button]").click();
		}, 1000 * second);
	};

	delay_hide_left_float = function(second)
	{
		window.setTimeout(function()
		{
			if(!disable_delay_func && is_show) $("div[switch-left-button]").click();
		}, 1000 * second);
	};
})();
