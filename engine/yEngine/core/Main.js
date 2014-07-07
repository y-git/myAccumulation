///**YEngine2D 入口类
// * 作者：YYC
// * 日期：2013-12-21
// * 电子邮箱：395976266@qq.com
// * QQ: 395976266
// * 博客：http://www.cnblogs.com/chaogex/
// */
//(function () {
//    namespace("YE").Main = YYC.AClass(YE.Entity, {
//        Init: function () {
//            this.base();
//
//            this.imgLoader = YE.ImgLoader.create();
//        },
//        Private: {
//            ye_prepare: function () {
//                var self = this;
//
//                this.loadResource();
//
//                this.imgLoader.onload_game = function(){
//                    self.onload.call(self, null);
//                };
//            }
//        },
//        Public: {
//            imgLoader: null,
//
//            init: function () {
//                this.ye_prepare();
//                this.imgLoader.done();
//            },
//            //* 钩子
//            Virtual: {
//                /**
//                 * 加载资源
//                 */
//                loadResource: function () {
//                }
//            },
//            Abstract: {
//                /**
//                 * 资源加载完成后调用
//                 */
//                onload: function () {
//                }
//            }
//        }
//    });
//}());
