/**YEngine2D 精灵动画帧管理类
 * 作者：YYC
 * 日期：2014-04-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").AnimationFrameManager = YYC.Class(YE.Entity, {
    Init: function () {
//        this.ye_actionManager = actionManager;
        this.ye_animationFrame = YE.AnimationFrame.create();
//        this.ye_anims = YE.AnimationFrame.create();
    },
    Private: {
//        ye_actionManager: null,
//        ye_recentAnim: null,
        ye_animationFrame: null
    },
    Public: {
        initAndReturnAnim: function (animName, spriteData) {
            var anim = null;

            if (YYC.Tool.judge.isString(arguments[0])) {
                anim = this.getAnim(arguments[0]);
            }
            else {
                anim = arguments[0];
            }
            anim.setCacheData(spriteData);
            anim.start();
//            this.ye_recentAnim = anim;

            return anim;
        },
//        removeAnim: function (animName) {
//            var anim = this.getAnim(animName);
//
//            this.ye_actionManager.removeAction(anim);
//        },
//        removeRecentAnim: function () {
//            this.ye_actionManager.removeAction(this.ye_recentAnim);
//        },
//        removeAll: function () {
//            this.ye_actionManager.removeAll();
//        },
        stopAnim: function (animName) {
            this.getAnim(animName).stop();
        },
        startAnim: function (animName) {
            this.getAnim(animName).start();
        },
        getAnim: function (animName) {
            return this.ye_animationFrame.getAnim(animName);
        },
        getAnims: function () {
            return this.ye_animationFrame.getAnims();
        },
        addAnim: function (animName, anim) {
            anim.setTag(animName);
            this.ye_animationFrame.addAnim(animName, anim);
        },
        resetAnim: function (animName) {
            this.getAnim(animName).reset();
        }
    },
    Static: {
        create: function () {
            return new YE.AnimationFrameManager();
        }
    }
});
