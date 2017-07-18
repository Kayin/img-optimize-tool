const gulp           = require('gulp');
const imagemin       = require('gulp-imagemin');
const pngquant       = require('imagemin-pngquant');
const jpegrecompress = require('imagemin-jpeg-recompress');

// Parse console option flags (--high, --verbose)
var argv = require('yargs').argv;
var verbose = argv.verbose; // --verbose option flag
if (argv.high) { // --high option flag quality settings
  var jpgoptimize = imagemin([imagemin.jpegtran({progressive: true})], {verbose: verbose}) // run lossless optimize
  var quality = {
    png : '60-80',
    svg : 3,
    gif : false
    //jpg : false //disabled: for jpgtran
    //jpg : {quality: 'high', method: 'ssim', min: 45, max: 80} //disabled: for jpeg-recompress
  }
  console.log("Optimizing with HIGHEST settings");
} else { // default low quality settings
  var jpgoptimize = imagemin([jpegrecompress({quality: 'low', method: 'smallfry', min: 0, max: 25})], {verbose: verbose}) // run lossy compress
  var quality = {
    png : '20-40',
    svg : 2,
    gif : true
    //jpg : true //disabled: for jpgtran
    //jpg : {quality: 'low', method: 'smallfry', min: 0, max: 25} //disabled: for jpeg-recompress
  }
  console.log("Optimizing with LOWEST settings");
}

/* optimize PNG images with pngquant via imagemin (https://pngquant.org/) */
gulp.task('optimizePNG', () =>
  gulp.src('src/**/*.png')
    .pipe(imagemin([
      pngquant({quality: quality.png})
    ], {verbose: verbose}))
    .pipe(gulp.dest('dist'))
);

/* optimize SVG images with SVGO via imagemin (https://github.com/svg/svgo/) */
gulp.task('optimizeSVG', () =>
  gulp.src('src/**/*.svg')
    .pipe(imagemin([
      imagemin.svgo({plugins: [{cleanupNumericValues: {floatPrecision: quality.svg}}]})
    ], {verbose: verbose}))
    .pipe(gulp.dest('dist'))
);

/* optimize GIF images with gifsicle via imagemin (https://github.com/sindresorhus/gulp-imagemin) */
gulp.task('optimizeGIF', () =>
  gulp.src('src/**/*.gif')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: quality.gif})
    ], {verbose: verbose}))
    .pipe(gulp.dest('dist'))
);

/* optimize with lossy jpg-recompress (https://github.com/imagemin/imagemin-jpeg-recompress), or lossless jpegtran if --high (https://github.com/sindresorhus/gulp-imagemin) */
/* ~disabled: optimize JPG images with jpg-recompress via imagemin (https://github.com/imagemin/imagemin-jpeg-recompress) */
/* ~disabled: optimize JPG images with jpegtran via imagemin (https://github.com/sindresorhus/gulp-imagemin)~ */
gulp.task('optimizeJPG', () =>
  gulp.src('src/**/*.+(jpg|jpeg)')
    .pipe(jpgoptimize)
    // .pipe(imagemin([
    //   imagemin.jpegtran({progressive: quality.jpg}) //disabled: for jpgtran
    // ], {verbose: verbose}))
    // .pipe(imagemin([
    //   jpegrecompress(quality.jpg) //disabled: for jpg-recompress
    // ], {verbose: verbose}))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', ['optimizePNG', 'optimizeSVG', 'optimizeGIF', 'optimizeJPG']);
gulp.task('png', ['optimizePNG']);
gulp.task('svg', ['optimizeSVG']);
gulp.task('gif', ['optimizeGIF']);
gulp.task('jpg', ['optimizeJPG']);
