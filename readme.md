Image Optimization Tool
=======================

v.1.0.3

This tool is to automate image optimization across format types for consistency purposes. It uses [Gulp](http://gulpjs.com) and [imagemin](https://github.com/imagemin/imagemin) to run optimization automation on images in `src` folder. 

PNG compression is done with [pngquant](https://pngquant.org/).

*(Note PNG compression is lossy, and turns 24-bit PNG images into indexed color PNG images while retaining alpha opacity.)*

SVG optimization is done with [SVGO](https://github.com/svg/svgo).

JPG optimization is done with [jpegtran](https://github.com/imagemin/imagemin-jpegtran) for lossless or [jpg-recompress](https://github.com/imagemin/imagemin-jpeg-recompress) for lossy optimization.

*(Note JPG compress is lossy by default, but will be lossless if option flag is set to `--high`)*

GIF optimization is done with [gifsicle](https://github.com/imagemin/imagemin-gifsicle).



Installation and Use
--------------------

This tool requires [Node.js](https://nodejs.org) (version 6+) and [Gulp](http://gulpjs.com) to be installed on your local machine.

*To check if you have these installed, or to verify the version, from console you can use `$ node -v` and `$ gulp -v`. If you do not have node.js you can install or update by downloading the OS appropriate binary from [nodejs.org](https://nodejs.org). To install or update gulp, from command line you can use `$ npm install gulp-cli -g`.*

run first time install, inside the project folder:

`$ npm install`

to use:

`$ gulp` or `$ gulp default` run compression on **all** image types in the `src` folder and output to `dist` folder.

to compress only on specific file formats you can run:

`$ gulp png` or `$ gulp svg` or `$ gulp jpg` or `$ gulp gif`

to run with higher quality settings, use the option flag `--high`. And to view detailed info on each compressed file, use the option flag `--verbose`. For example:

`$ gulp png --high --verbose`

note that with `--high` flag use jpg optimization will be lossless. Use if default jpg optimization results in too poor of image quality.


