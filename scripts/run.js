var argv = require('optimist').argv;
var fs = require('fs');
var html = fs.readFileSync(argv.temp_file_path).toString();

var header = '<style> \
#winpop { position: fixed !important; bottom: 10px !important; top: auto !important;} \
.glistbox { background:url(/images/sy.png) silver no-repeat; width: 1000px;  height:165px;margin:0 auto; } \
.glistbox iframe { margin: 30px 0 0 65px !important; } \
.counter { background:url(/images/yan.png) silver no-repeat center; margin:0 auto; width: 1000px; height:505px; } \
</style> \
<script src="/js/top_new.htm"></script> \
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

console.log(html);


