const fs = require('fs');
const path = require('path');
const config = require('./vue.config.js');

const outputDir = config.outputDir;

const viewPath = './server/views';
const publicPath = './server/public';
const pathArr = [].concat(publicPath, viewPath);

deleteall(viewPath);  // 删除server下的views下的文件
deleteall(publicPath); // 删除server下的public下的文件

var dists = fs.readdirSync(outputDir); // 读取dist下的文件
dists.forEach(function (file, index) {
    console.log(file);
    var targetPath = outputDir + "/" + file;
    var toPath = viewPath + '/' + file;
    if (file == 'index.html') {  // 如果是index.html 移动到viewPath
        fs.copyFileSync(targetPath, toPath);
    } else {  // 否则移动到publicPath
        toPath = publicPath + '/' + file;
        if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
            copyFolder(targetPath, toPath);
        } else { // 拷贝文件
            fs.copyFileSync(targetPath, toPath);
        }
    }
})


function deleteall(path) { // 删除path目录下所有文件包括本身
    console.log('删除文件夹' + path);
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        if (!pathArr.includes(path)) {
            fs.rmdirSync(path);
        }
        // fs.rmdirSync(path);
    }
};

function copyFolder(from, to) { // 复制文件夹到指定目录
    let files = [];
    if (fs.existsSync(to)) { // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function (file, index) {
            var targetPath = from + "/" + file;
            var toPath = to + '/' + file;
            if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
                copyFolder(targetPath, toPath);
            } else { // 拷贝文件
                fs.copyFileSync(targetPath, toPath);
            }
        });
    } else {
        fs.mkdirSync(to);
        copyFolder(from, to);
    }
}