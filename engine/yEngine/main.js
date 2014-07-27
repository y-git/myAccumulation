/**YEngine2D 入口配置类
 * 作者：YYC
 * 日期：2014-07-27
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
//单例
//setConfig
////loadEngine
//loadWhenDomReady:true
(function () {
    var jsLoader = null;

    function _extend(destination, source) {
        var property = "";

        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    }

    jsLoader = {
        ye_container: [],

        ye_loadJsSync: function (js, func) {
            var script = null;

            script = this.ye_createScript(js);
            this.ye_appendScript(script);

            this.ye_onloadSync(js, script, func);
        },
        ye_appendScript: function (script) {
            var head = document.getElementsByTagName("head")[0];

            head.appendChild(script);
        },
        ye_createScript: function (js) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = js.src;

            return script;
        },
        ye_onloadSync: function (js, script, func) {
            var self = this;

            if (script.readyState) { //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        js.callback && js.callback.apply(js.obj, js.args);

                        self.ye_loadNext(func);
                    }
                };
            }
            else { //Others
                script.onload = function () {
                    js.callback && js.callback.apply(js.obj, js.args);

                    self.ye_loadNext(func);
                };
            }
        },
        ye_loadNext: function (func) {
            if (this.ye_container.length == 0) {
                this.onload();
                return;
            }
            else {
                func.call(this, null);
            }
        },

        onload: function () {
        },

        add: function (src, callback, args, obj) {
            this.ye_container.push({ src: src, callback: callback, args: args || [], obj: obj ? obj : window });

            return this;
        },
        loadSync: function () {
            if (this.ye_container.length == 0) {
                throw new Error("请先加入js");
            }
            var js = this.ye_container.shift();

            this.ye_loadJsSync(js, this.loadSync);
        }
    };

    //*全局方法
    (function () {
        /**
         * 创建命名空间。
         示例：
         namespace("YYC.Tool.Button");
         */
        var global = {
            namespace: function (str) {
                var parent = window,
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    YE.error(true, "命名空间不能为空");
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                return parent;
            }
        };

        _extend(window, global);
    }());


    namespace("YE").main = {
        ye_config: {
            //*调试配置

            //是否处于调试状态
            //如果是，则会开启assert、log方法，Director->getPixPerFrame返回的速度不会受到fps的影响
            debug: false,
            showDebugOnPage: false, //是否在页面上显示调试信息
            loadWhenDomReady: true, //是否在DOM加载完成后自动加载
//                    showFPS:true,
//                    frameRate:60,
//                    tag:'gameCanvas', //the dom element to run cocos2d on
            engineDir: "",
            //SingleEngineFile:'',
            userFilePaths: [],              //add your own files in order here
            onload: function () {
            }
        },
        ye_engineFilePaths: [
            "jquery-1.7.js",
            "YOOP.js",
            "jsExtend.js"  ,

            "tool/Tool.js" ,

            "base/Entity.js" ,
            "base/Node.js",
            "base/NodeContainer.js",
            "base/CollectionManager.js" ,

            "structure/Hash.js"  ,
            "structure/Collection.js" ,
            "structure/Geometry.js",
            "structure/Bitmap.js",

            "algorithm/collision.js",
            "algorithm/FindPath.js" ,

            "loader/Loader.js"  ,
            "loader/ImgLoader.js" ,

            "loader/JsonLoader.js",
            "loader/SoundLoader.js",
            "loader/LoaderManager.js" ,


            "sound/SoundManager.js"  ,

            "core/Director.js",
            "core/Scene.js",
            "core/Layer.js" ,
            "core/Sprite.js"  ,


            "event/Event.js",
            "event/EventManager.js" ,

            "animation/AnimationFrame.js"  ,
            "animation/Animation.js" ,
            "animation/Frame.js",
            "animation/FrameCache.js",
            "animation/AnimationManager.js",
            "animation/AnimationFrameManager.js" ,
            "animation/AnimationCache.js"  ,


            "action/IAnimationAction.js",
            "action/Action.js",
            "action/ActionInterval.js" ,
            "action/Control.js"  ,
            "action/Animate.js" ,
            "action/ActionManager.js",
            "action/Repeat.js",
            "action/RepeatForever.js" ,
            "action/RepeatCondition.js"  ,
            "action/Sequence.js" ,
            "action/Spawn.js"  ,
            "action/CallFunc.js" ,
            "action/DelayTime.js",

            "ui/Graphics.js" ,

            "../ySoundEngine/YSoundEngine.js"
        ],
        ye_isLoaded: false,

        ye_loadJsLoader: function () {
            var engineFilePaths = this.ye_engineFilePaths,
                engineDir = this.ye_config.engineDir,
                userFilePaths = this.ye_config.userFilePaths,
                onload = this.ye_config.onload;

            this.ye_isLoaded = true;
            jsLoader.onload = onload;

            window.addEventListener("DOMContentLoaded", function () {
                engineFilePaths.forEach(function (filePath) {
                    jsLoader.add(engineDir + filePath);
                });

                userFilePaths.forEach(function (filePath) {
                    jsLoader.add(filePath);
                });

                jsLoader.loadSync();
            });
        },
        setConfig: function (config) {
            _extend(this.ye_config, config);

            if (this.ye_config.loadWhenDomReady) {
                this.ye_loadJsLoader();
            }
        },
        getConfig: function () {
            return this.ye_config;
        },
        load: function () {
            if (this.ye_config.loadWhenDomReady) {
                console.log("已配置为DOM加载完成后自动加载文件，此处不再进行加载");
                return false;
            }
            else if (this.ye_isLoaded) {
                console.log("已经加载过文件了，不能重复加载");
                return false;
            }

            this.ye_loadJsLoader();
        },

        forTest_getJsLoader: function () {
            return jsLoader;
        }
    };

}());