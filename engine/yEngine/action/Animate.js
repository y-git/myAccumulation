/**YEngine2D 帧动画动作类
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").Animate = YYC.Class({Interface: YE.IAnimationAction, Class: YE.ActionInterval}, {
        Init: function () {
            this.base();

            this.ye___frames = YE.Collection.create();
        },
        Private: {
            ye___anim: null,
            ye___frames: null,
            // 包含的Frame数目
            ye___frameCount: -1,

            ye___duration: 0,

            ye___currentFrameIndex: -1,
            ye___currentFramePlayed: -1,
            ye___currentFrame: null,

            ye___setCurrentFrame: function (index) {
                this.ye___currentFrameIndex = index;
                this.ye___setFrame(this.ye___frames.getChildAt(index));
                this.ye___currentFramePlayed = 0;
            },
            ye___setFrame: function (frame) {
                frame.index = this.ye___currentFrameIndex;
                this.ye___currentFrame = frame;
            }
        },
        Public: {
            getCurrentFrame: function () {
                return this.ye___currentFrame;
            },
            initWhenCreate: function (animation) {
                this.ye___anim = animation;
                this.ye___frames.addChilds(this.ye___anim.getFrames());
                this.ye___duration = this.ye___anim.getDurationPerFrame();
                this.ye___frameCount = this.ye___frames.getCount();

                this.ye___setCurrentFrame(0);
            },
            /**
             * 更新Animation状态，只播放一次
             * @param deltaTime 游戏主循环的间隔时间，以秒为单位
             */
            update: function (deltaTime) {
                //判断当前Frame是否已经播放完成,
                if (this.ye___currentFramePlayed >= this.ye___duration) {
                    //播放下一帧

                    //如果最后一帧已播放完毕
                    if (this.ye___currentFrameIndex >= this.ye___frameCount - 1) {
                        this.finish();

                        return;
                    } else {
                        //播放下一帧
                        this.ye___currentFrameIndex++;

//                        this.ye_P_canClear = true;
                    }
                    //设置当前帧信息
                    this.ye___setCurrentFrame(this.ye___currentFrameIndex);

                } else {
                    //增加当前帧的已播放时间.
                    this.ye___currentFramePlayed += deltaTime;

//                    this.ye_P_canClear = false;
                }
            },
            /**
             * 重置当前帧
             */
            reset: function () {
                this.base();

                this.ye___setCurrentFrame(0);
            },
            copy: function () {
                return YE.Animate.create(this.ye___anim.copy());
            },
            reverse: function () {
                this.ye___frames.reverse();
                this.ye___setFrame(this.ye___frames.getChildAt(this.ye___currentFrameIndex));

                return this;
            }
        },
        Static: {
            create: function (animation) {
                var animate = new YE.Animate();
                animate.initWhenCreate(animation);

                return animate;
            }
        }
    });
}());