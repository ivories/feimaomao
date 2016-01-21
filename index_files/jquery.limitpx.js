/**
 * demo: 
 * 1.$("#limitpx").limitpx(); 
 * 2.$("#limitpx").limitpx({"limit":1});
 * 3.$("#limitpx").limitpx({"limit":1,"morefn":{"status":true}});
 * 4.$("#limitpx").limitpx({"limit":1,"morefn":{"status":true,"moretext":"更多","lesstext":"隐藏部分","fullfn":function(){alert("more")},"lessfn":function(){alert("less")}}})
 * 5.$("#limitpx").limitpx({"limit":1,"morefn":{"status":true}}).limit("all");
 * @param {Object} opt
 * {
 * 	   limit:300,//显示300px的高度
 * 	   morefn:{
 * 		   status:false,//是否启用更多
 *         moretext: "(more)",//隐藏部分文字时候显示的文字
 *         lesstext:"(less)",//全部文字时候显示的文字
 *         cssclass:"limitpxclass",//启用更多的A标签的CSS类名
 *         lessfn:function(){},//当文字为更少显示时候回调函数
 *         fullfn:function(){}//当文字为更多时候回调函数
 * }
 * @author Eric.Liu
 * @version 0.1
 */
jQuery.fn.extend({
    limitpx: function (opt) {
        opt = $.extend({
            "limit": 300
        }, opt);
        opt.morefn = $.extend({
            "status": false,
            "moretext": "(more)",
            "lesstext": "(less)",
            "cssclass": "limitpxclass",
            "lessfn": function () {
            },
            "fullfn": function () {
            }
        }, opt.morefn);

        var othis = this;
        var $this = $(othis);
        var show_more = document.createElement("div");
        show_more.setAttribute("id", "show_more");
        this.limit = function (limit) {

            if ($this.innerHeight() <= limit || limit == 'all') {
                $this.css({height: "auto", overflow: ""});
            }
            else {
                $this.css({height: limit + "px", overflow: "hidden"});
                show_more.innerHTML = "<a onclick='javascript:;' class=" + opt.morefn.cssclass + ">" + opt.morefn.moretext + "</a>";
                $(show_more).insertAfter($this[0]);
            }
        }

        $(show_more).on("click", function () {
            if ($(this).text() == opt.morefn.moretext) {
                show_more.innerHTML = "<a onclick='javascript:;' class=" + opt.morefn.cssclass + ">" + opt.morefn.lesstext + "</a>";
                othis.limit("all");
                opt.morefn.fullfn();
            } else {
                othis.limit(opt.limit);
                opt.morefn.lessfn();
            }
        });

        this.limit(opt.limit);
        return this;
    }
});