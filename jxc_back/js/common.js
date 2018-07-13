/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/7/6
 */

//工具方法
var util = {
    /**
     * [resizeWindow 根据font自适应]
     * @return 0
     */
    resizeWindow: function(){
        var cHeight = $(document.body)[0].clientWidth;
        var windowHeight = cHeight / 7.5 + "px";
        $('html').css('fontSize', windowHeight);
    },

    tipInfo: function(str){
        var cont = "<span class='bubble f-dn l-bdru f-ptr2 f-fs1'>" + str +"</span>";

        $('body').append(cont);

        $(".bubble").fadeIn('slow').delay(200).fadeOut('slow');
    },

    /**
     * [imgUpLoad 多张图片上传]
     * @return {[type]} [0]
     */
    imgUpLoad: function(id, url){
        id.diyUpload({
            url: url,
            success:function(data) {
                console.info(data);
            },
            error:function(err) {
                console.info(err);    
            }
        });
    },

    /**
     * [setnavscroll 浏览器滚动条位置]
     * @param  {[type]} navbar [nav上填充高度]
     * @param  {[type]} nav    [nav内容]
     * @param  {[type]} navfix [nav上添加的class]
     * @return {[type]}        0
     */
    setnavscroll: function(navbar, nav, navfix){
        var window_top = $(window).scrollTop();
        var div_top = navbar.offset().top;

        if (window_top > div_top) {
            nav.addClass(navfix);
            navbar.height(nav.height());
        } else {
            nav.removeClass(navfix);
            navbar.height(0);
        }
    },

    /**
     * 文本编辑
     * [fixInfo 文本编辑]
     * @param  {[type]} edit_btn     [编辑图标]
     * @param  {[type]} info_txt     [文本内容标签]
     * @param  {[type]} info_input   [输入框]
     * @param  {[type]} edit_box     [确定关闭按钮的容器]
     * @param  {[type]} comfirm_btn  [确定按钮]
     * @param  {[type]} close_btn    [关闭按钮]
     * @param  {[type]} effect_class [编辑改变样式]
     * @param  {[type]} active_class [active添加在这个样式上]
     * @return {[type]}              [0]
     */
    fixInfo: function(edit_btn, info_txt, info_input, edit_box, comfirm_btn, close_btn, effect_class, active_class){
        //编辑
        edit_btn.click(function(){
            var oldName = info_txt.text();  //获取text文本

            info_txt.hide();  //隐藏txt文本
            info_input.show().val(oldName);  //显示input文本框，并将text文本中的内容添加进去

            edit_btn.hide();  //隐藏编辑按钮
            edit_box.show();  //显示确定关闭按钮

            effect_class.addClass(active_class);  //给当前编辑区域布局添加样式

            info_input.focus();  //给输入框聚焦，移动端自动弹出键盘
        });

        //确定修改
        comfirm_btn.click(function(){
            var newName = info_input.val();  //获取input文本框中的内容

            info_input.hide();  //隐藏inpu文本框
            edit_box.hide();  //隐藏确定关闭按钮

            edit_btn.show();  //显示编辑按钮
            info_txt.show().text(newName);  //显示text文本,并将input文本框中的内容添加进去

            effect_class.removeClass(active_class);  //回复原来的状态需要将编辑区域的样式去除
        });

        //关闭
        close_btn.click(function(){
            info_input.hide();  //隐藏inpu文本框
            edit_box.hide();  //隐藏确定关闭按钮

            edit_btn.show();  //显示编辑按钮
            info_txt.show();  //显示text文本

            effect_class.removeClass(active_class);  //回复原来的状态需要将编辑区域的样式去除
        });
    },
};

//窗口大小改变时加载
$(window).on('resize', function(){
    util.resizeWindow();  //根据font自适应
});

//load
$(function(){
    util.resizeWindow();  //根据font自适应
});