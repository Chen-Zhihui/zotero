/**
 * 当当首页
 * @version 1.0 上线版本号
 * @author fpf
 * @编码utf8
 * log 新增模块
 */
(function (window, $) {

    /**
     * 获取cookie
     **/
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    var config = {server: "http://recosys.dangdang.com/realdata/collect.jpg", intervalTime: 400, state: 'dev'};
    var MODULE = {
        indexreco: "indexreco" //首页猜你喜欢
    };
    var perm_id = getCookie("__permanent_id");//用户标识
    var main_pid = 0; //主商品id，被添加商品
    var reco_timer = null; //周期运行
    var reco_list = null;//猜你喜欢
    var reco_flag = false;

    /**
     * 发送点击信息
     * @param strvalue
     */
    function report_click(strvalue) {
        strvalue = config.server + '?' + strvalue + '&type=1&random_id=' + Math.random();
        $(document.body).append("<img style=\"display: none;\" src=\"" + strvalue + "\"/>");
    }

    /**
     * 发送曝光数据
     * @param li 数据
     */
    function report(li) {
        var position = $(li).attr("position");
        var traced = $(li).attr("traced");
        if (position != null && traced != 1) {
            var src = config.server + "?" + position + "&type=0&random_id=" + Math.random();
            $(document.body).append("<img style=\"display: none;\" src=\"" + src + "\"/>");
            $(li).attr("traced", 1)
        }
    }

    function report_list(li_list) {
        for (var i = 0; i < li_list.length; i++) {
            var position = $(li_list[i]).attr("position");
            var traced = $(li_list[i]).attr("traced");
            if (position != null && traced != 1) {
                var src = config.server + "?" + position + "&type=0&random_id=" + Math.random();
                $(document.body).append("<img style=\"display: none;\" src=\"" + src + "\"/>");
                $(li_list[i]).attr("traced", 1); //曝光标记
            }
        }
    }


    /**
     * 监测是否进入可视区
     * @param page 翻页
     * @param clientHeight
     * @param scrollTop
     */
    function trace(page, clientHeight, scrollTop) {
        if (page != null) {
            var li_list = $(page).find("li");
            if (li_list != null && li_list.length > 0) {
                for (var i = 0; i < li_list.length; i++) {
                    var offsetTop = $(li_list[i]).offset().top;
                    var height = $(li_list[i]).height();
                    if (offsetTop < scrollTop) {
                        //已经滚动到可视取上方
                        if ((offsetTop + height) > scrollTop && (offsetTop + height) < (clientHeight + scrollTop)) {
                            //露出尾部
                            report(li_list[i]);
                            $(page).attr("traced", 1);
                        } else if ((offsetTop + height) < scrollTop) {
                            //上方不可见位置
                        }
                    } else if (offsetTop < clientHeight + scrollTop) {
                        //进入可视区
                        report(li_list[i]);
                        $(page).attr("traced", 1);
                    } else {
                        //在可视区下方
                    }
                }
            }
        }

    }


    /*reco分页事件*/
    function reco_trace_page() {
        var div_visible = get_reco_visible_list(reco_list_id); //获取可见的图书页
        var li_list = $(div_visible).find("li");
        if (li_list.length > 0) {
            report_list(li_list);
        }
    }


    /*获取reco可见模块*/
    function get_reco_visible_list(reco_list_id) {
        var div_list = $(reco_list_id);
        //var div_list = $(reco_list_id).find("div.lie");
        for (var i = 0; i < div_list.length; i++) {
            return div_list[i];
        }
    }


    /*
     *reco模块监控
     */
    function test_recoData(timer, reco_struct, moudle_name) {
        var reco_div = $(reco_struct.reco_div_id);
        reco_list = $(reco_div).find(reco_struct.reco_list_id).find("li");
        if (reco_list.length > 0) {
            clearInterval(timer);
            if (reco_flag == true){
                return;
            }
            reco_flag = true;
            var request_id = $(reco_struct.request_element_id).attr("request_id");
            for (var i = 0; i < reco_list.length; i++) {
                var url = $(reco_list[i]).find(reco_struct.a_class).attr("href");
                var reco_pid = /\d+/.exec(url)[0];
                var position = i + 1;
                var params = {
                    request_id: request_id,
                    perm_id: perm_id,
                    module: moudle_name,
                    main_pid: 0,
                    reco_pid: reco_pid,
                    position: position,
                    state: config.state, // 状态
                    client: "PC"
                };
                var paramsstr = $.param(params);
                $(reco_list[i]).attr("position", paramsstr);


                //添加点击事件
                $(reco_list[i]).find("a").click(function () {
                    if (reco_struct.a_depth == 1){
                        var position = $(this).parent().attr("position");
                        if (position == null) {
                            position = $($(this).parent()).parent().attr("position");
                        }
                    }
                    else if(reco_struct.a_depth == 2){
                        var position = $($(this).parent()).parent().attr("position");
                    }
                    report_click(position);
                })
            }

            //添加分页事件
            //左翻页
            if(reco_struct.left_id != ""){
                var prev = $(reco_div).find(reco_struct.left_id).find("span").click(function () {
                    setTimeout(function () {
                        reco_trace_page(reco_struct.reco_list_id);
                    }, 400);
                });
            }
            //右翻页
            if(reco_struct.right_id != ""){
                var next = $(alsoview_div).find(reco_struct.right_id).find("span").click(function () {
                    setTimeout(function () {
                        reco_trace_page(reco_struct.reco_list_id);
                    }, 400);
                });
            }
            //圆点点击
            if(reco_struct.fanye_id != ""){
                var topage = $(alsoview_div).find(reco_struct.fanye_id).find("span").click(function () {
                    setTimeout(function () {
                        reco_trace_page(reco_struct.reco_list_id);
                    }, 400);
                });
            }

            //第一页曝光
            var clientHeight = $(window).height();
            var scrollTop = $(document).scrollTop();
            var div_visible = get_reco_visible_list(reco_struct.reco_list_id);
            trace(div_visible, clientHeight, scrollTop);

            //添加滚动事件
            $(window).scroll(function () {
                var clientHeight = $(window).height();
                var scrollTop = $(document).scrollTop();
                var page = get_reco_visible_list(reco_struct.reco_list_id);
                trace(page, clientHeight, scrollTop);
            });
        }

    }


    /**
     * 当当首页
     */
    function index_start() {
        //猜你喜欢
        var page_reco = {
            reco_div_id: "#guess_like",
            reco_list_id: "#indexreco",
            request_element_id: "#indexreco",
            a_class: "a.pic",
            a_depth: 1,
            right_id: "", //"div.left"
            left_id: "", //"div.right"
            fanye_id: "" //"div.recommend_fanye"
        };
        reco_timer = setInterval(function () {
            test_recoData(reco_timer, page_reco, MODULE.indexreco);
        }, config.intervalTime);
        //alert("当当首页");
    }

    window.CC = {
        //当当首页
        index: function () {
            index_start();
        }
    }
})(window, jQuery);
