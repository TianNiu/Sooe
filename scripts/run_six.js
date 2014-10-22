var argv = require('optimist').argv;
var current_file_path = argv.current_file_path.replace('index.html', '');
var temp_file_path = argv.temp_file_path;
var path = require('path');
var fs = require('fs');
var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

var html = fs.readFileSync(temp_file_path).toString();
// var html = fs.readFileSync('index.html').toString();


var header = '<style> \
#winpop { position: fixed !important; bottom: 10px !important; top: auto !important;} \
.glistbox { background:url(/images/sy.png) silver no-repeat; width: 1000px;  height:165px;margin:0 auto; } \
.glistbox iframe { margin: 30px 0 0 65px !important; } \
.counter { background:url(/images/yan.png) silver no-repeat center; margin:0 auto; width: 1000px; height:505px; } \
</style> \
<script src="/top_new618.htm"></script> \
<script>var bannerID=0; var isMask=0;</script>';

var footer = '<div style="width:1000px; \
background:#fff; padding-top:10px;margin:0 auto; \
text-align:center;"><script src="/hint.js"></script></div>';

var gb = '<script src="http://588.sooe.cn/gbook/glist.js"></script> \
<div class="counter"><a href="#book"></a><script src="/counter.htm"></script></div>';


html = html.replace('charset=utf-8', '').
            replace('<!--#include virtual="/header_footer/haibao_header.html"-->', header).
            replace('<!--#include virtual="/header_footer/haibao_newfooter.html"-->', footer).
            replace(/document.*?800\.91jmw.*?<\/script>/, '</script>' + gb);

fs.writeFileSync(path.join(current_file_path, '1.html'), html);
console.log(path.join(current_file_path, '1.html'));




