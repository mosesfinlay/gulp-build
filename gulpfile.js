"use strict";

const { task, src, dest, series } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

task("scripts", () => {
  return src("js/circle/*.js")
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/scripts/"));
});

task("styles", done => {
  return src("sass/global.scss")
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename("all.min.css"))
    .pipe(dest("dist/styles/"));
});

task("build", series("scripts", "styles"));

task("default", series("build"));