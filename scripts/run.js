var path = require('path');
var fs = require('fs-extra');
var iconv = require('iconv-lite'); iconv.extendNodeEncodings();

function run(options) {
  var srcHfg = JSON.parse( fs.readFileSync(  path.join(__dirname, options.srcType + '.json') ).toString() );

  var html = options.srcHtml.replace(new RegExp(srcHfg.header), options.sooeHfg.header).
             replace(new RegExp(srcHfg.footer), options.sooeHfg.footer).
             replace(new RegExp(srcHfg.guestbook), options.sooeHfg.guestbook);

  fs.writeFileSync( path.join(options.destHtml), html, { encoding: options.encoding } );
}

exports.run = run;




