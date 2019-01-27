"use strict";

const { task, src, dest, series } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const maps = require("gulp-sourcemaps");
const image = require("gulp-image");
const del = require("del");
const connect = require("gulp-connect");

task("scripts", () => {
  return src("js/circle/*.js")
    .pipe(maps.init())
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(maps.write("./"))
    .pipe(dest("dist/scripts/"));
});

task("styles", () => {
  return src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename("all.min.css"))
    .pipe(maps.write("./"))
    .pipe(dest("dist/styles/"));
});

task("images", () => {
  return src("images/*.{jpg,png}")
    .pipe(image())
    .pipe(dest("dist/content/"));
});

task("html", () => {
  connect.server({
    root: "dist",
    port: 3000,
    livereload: true
  });

  return src("index.html")
    .pipe(dest("dist/"));
});

task("clean", () => del("dist/"));

task("build", series("clean", "scripts", "styles", "images", "html"));

task("default", series("build"));