const { src, dest, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');

function html() {
    return src('src/*.html') // 指定源文件路径，例如 'src/*.html'
        .pipe(htmlmin({
            // collapseWhitespace: true, // 折叠所有空白字符
            // removeComments: true, // 移除 HTML 中的注释
            // minifyCSS: true, // 压缩内联 CSS
            // minifyJS: true // 压缩内联 JavaScript
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(dest('dist')); // 指定输出目录，例如 'dist'
}

exports.default = series(html); // 默认任务
