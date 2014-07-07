/**YEngine2D 动画缓存类
 * 作者：YYC
 * 日期：2014-05-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    namespace("YE").AnimationCache = YYC.Class(YE.Entity, {
        Init: function () {
            this.base();

            this.ye_animations = YE.Hash.create();
        },
        Private: {
            ye_animations: null,


            ye_buildFrameName: function (animPrex, numberLen, index) {
                index = index.toString();

                while (index.length < numberLen) {
                    index = "0" + index;
                }
                return animPrex + index;
            }
        },
        Public: {
            createAnim: function (startFrameName, endFrameName, config) {
                var startIndex = null,
                    endIndex = null,
                    animPrex = null,
                    numberLen = 0,
                    animFrames = [],
                    animation = null,
                    animate = null,
                    frames = null,
                    _config = {
                        duration: 0.1,
                        flipX: false,
                        flipY: false,
                        pixelOffsetX: 0,
                        pixelOffsetY: 0,
                        repeatNum: -1
                    } ,
                    i = 0;

                if (arguments.length === 1) {
                    frames = arguments[0].frames;
                    YE.Tool.extend.extendExist(_config, arguments[0]);

                    frames.forEach(function (frame) {
                        animFrames.push(YE.FrameCache.getInstance().getFrame(frame));
                    });
                }
                else if (arguments.length === 2) {
                    animFrames = [YE.FrameCache.getInstance().getFrame(arguments[0])];
                    YE.Tool.extend.extend(_config, arguments[1]);
                }
                else if (arguments.length === 3) {
                    startIndex = startFrameName.substring(startFrameName.search(/\d+$/), startFrameName.length);
                    endIndex = endFrameName.substring(endFrameName.search(/\d+$/), endFrameName.length);
                    animPrex = startFrameName.substring(0, startFrameName.search(/\d+$/));
                    numberLen = startIndex.length;


                    startIndex = Number(startIndex);
                    endIndex = Number(endIndex);

                    for (i = startIndex; i <= endIndex; i++) {
                        animFrames.push(YE.FrameCache.getInstance().getFrame(this.ye_buildFrameName(animPrex, numberLen, i)));
                    }

                    YE.Tool.extend.extend(_config, config);
                }

                animation = YE.Animation.create(animFrames, {
                    duration: _config.duration,
                    flipX: _config.flipX,
                    flipY: _config.flipY,
                    pixelOffsetX: _config.pixelOffsetX,
                    pixelOffsetY: _config.pixelOffsetY
                });

                if (_config.repeatNum === -1) {
                    animate = YE.RepeatForever.create(YE.Animate.create(animation));
                }
                else {
                    animate = YE.Repeat.create(YE.Animate.create(animation), _config.repeatNum);
                }

                return animate;
            },
            addAnim: function (animName, anim) {
                this.ye_animations.add(animName, anim);
            },
            addAnimWithFile: function (jsonFilePath) {
                var jsonData = null,
                    i = null;

                jsonData = YE.JsonLoader.getInstance().get(jsonFilePath);

                for (i in jsonData) {
                    if (jsonData.hasOwnProperty(i)) {
                        this.addAnim(i, this.createAnim(jsonData[i]));
                    }
                }
            },
            removeAnim: function (animName) {
                this.ye_animations.remove(animName);
            },
            getAnim: function (animName) {
                return this.ye_animations.getValue(animName);
            },

            forTest_getAnim: function (animName) {
                return this.ye_animations.getValue(animName);
            }
        },
        Static: {
            getInstance: function () {
                if (_instance === null) {
                    _instance = new this();
                }
                return _instance;
            },
            forTest_clearInstance: function () {
                _instance = null;
            }
        }
    });
}());