'use strict';

module.exports = function () {
  $.gulp.task('svg', function () {
    return $.gulp.src('./source/sprite/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
            example: {
              dest: '../tmp/spriteSvgDemo.html' // демо html
            }
          }
        }
      }))
      .pipe($.gulp.dest($.config.root + '/assets/img'))
  })
};