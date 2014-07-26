/**YEngine2D 配置信息类
 * 作者：YYC
 * 日期：2014-01-05
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").Config = {
//        //A*算法设置
//        algorithm: {
//            //有几个方向
//            DIRECTION: 4
//        },


        //*调试配置

        //是否处于调试状态
        //如果是，则会开启assert、log方法，Director->getPixPerFrame返回的速度不会受到fps的影响
          DEBUG: true,
        //是否在页面上显示调试信息
        IS_SHOW_DEBUG_ON_PAGE: false
    }
}());