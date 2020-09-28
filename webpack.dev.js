const path = require("path");
module.exports = {
    mode:"development",
    devServer:{ //在内存中打包的
        port:9999,
        // open:true,
        compress:true,//开启gzip压缩
        hot:true,  //自动更新css代码
        contentBase:path.resolve(__dirname,"static") //以根目录为基准启动配置一个访问的静态资源
    }
}