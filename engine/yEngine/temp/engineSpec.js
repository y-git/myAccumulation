(function () {
    var tool = require("../tool.js");
    var path = require("path");
    var fs = require("fs");
    var url = require("url");
    var config = require("../config.js");
    var action = require("./action.js");
    require("../jsExtend.js");

    function run(req, res) {
        var pathname = url.parse(req.url).pathname;

        if (_isRequestAction(pathname)) {
            action[pathname.slice(1)](req, res);
            return;
        }

        _loadResource(pathname, res);
    }

    function _isRequestAction(pathname) {
        return pathname.match(/\.[^.]+$/) === null;
    }

    function _loadResource(pathname, res) {
        var ext = null,
            fileName = pathname.slice(1),
            filePath = null;

        //取得后缀名
        ext = pathname.match(/\.[^.]+$/)[0];

        if (config.insertJs.contain(fileName)) {
            filePath = path.join(config.jsDir, pathname);
        }
        else {
            filePath = path.join(config.outputDir, pathname);
        }

        switch (ext) {
//        case ".css":
            case ".js":
            case ".html":
                fs.readFile(filePath, 'utf-8', function (err, data) {//读取内容
                    if (err) {
                        throw err;
                    }

                    res.writeHead(200, {
                        "Content-Type": {
//                            ".css": "text/css",
                            ".js": "application/javascript",
                            ".html": "text/html"
                        }[ext]
                    });
                    res.write(data);
                    res.end();
                });
                break;
            default :
                res.end();
                break;
        }
    }

    exports.run = run;
}());