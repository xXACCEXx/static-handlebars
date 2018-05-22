const fs = require('vinyl-fs');
const path = require('path');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');

const env = './tests';

const compileHBS = (directory, type, dest) => fs
	.src(`${directory}/*.hbs`)
	.pipe(handlebars())
	.pipe(wrap(`Handlebars.${type}(<%= contents %>)`))
	.pipe(declare({
		namespace: `app.${dest}`,
		noRedeclare: true
	}))
	.pipe(concat(`${dest}.js`))
	.pipe(fs.dest('./_tmp'));

compileHBS('./tests/partials', 'partial', 'partials');
compileHBS('./tests/pages', 'template', 'templates');