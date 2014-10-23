var path = require('path');
var fs = require('fs-extra');
var argv = require('optimist').argv;
var run = require('./run').run;

var mode = +argv.mode;

var currentFolder = argv.current_file_path.replace('index.html', '');


var srcHtml = fs.readFileSync(argv.temp_file_path).toString().replace('charset=utf-8', '').replace(/"images\//g, '"' + argv.dest + '/');
// var srcAssets = path.join( currentFolder, 'images' );

var destHtml = path.join( currentFolder, argv.dest + '.html');
// var destAssets = path.join( currentFolder, argv.dest + '/' );

try {
  // fs.copySync(srcAssets, destAssets);
} catch(e) {}



// 普通页头
var header0 = '<style> \
#winpop { position: fixed !important; bottom: 10px !important; top: auto !important;} \
.glistbox { background:url(/images/sy.png) silver no-repeat; width: 1000px;  height:165px;margin:0 auto; } \
.glistbox iframe { margin: 30px 0 0 65px !important; } \
.counter { background:url(/images/yan.png) silver no-repeat center; margin:0 auto; width: 1000px; height:505px; } \
</style> \
<script src="/js/top_new.htm"></script> \
<script>var bannerID=0; var isMask=0;</script>';

// 6_页头
var header1 = '<style> \
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

var guestbook = '<script src="http://588.sooe.cn/gbook/glist.js"></script> \
<div class="counter"><a href="#book"></a><script src="/counter.htm"></script></div>';

try {
  run({
    srcType: '91',
    srcHtml: srcHtml,
    destHtml: destHtml,
    encoding: 'gbk',
    sooeHfg: {
      header: mode === 0? header0 : header1,
      footer: footer,
      guestbook: guestbook
    }
  });

  console.log(destHtml);
} catch(e) {
  console.log(e);
}

