let gulp = require('gulp');
let process = require('process')
// let icons = require("./icons.json")

const through = require('through2');

let icons_with_search_terms = {};

let styles_class_mapping = {
  'brands': 'fab',
  'solid': 'fas',
  'regular': 'far',
  'light': 'fal',
  'duotone': 'fad',
}

let createIcons = function () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    if (file.isStream()) {
      cb(new PluginError('gulp-autoprefixer', 'Streaming not supported'));
      return;
    }

    // console.log('file', file)

    let iconsjson = JSON.parse(file.contents.toString());
    // console.log('iconsjson', Object.keys(iconsjson))

    icons_with_search_terms = {'icons': []}
    process.stdout.write('Processing Icons:\n')
    Object.keys(iconsjson).forEach(function (icon_name, index) {
      let icon_info = iconsjson[icon_name];
      // console.log('icon_info', icon_info);
      process.stdout.write("Processing " + index + " icons\r");
      icon_info.styles.forEach(function (style) {
        if (style === 'light') {
          return;
        }
        icons_with_search_terms['icons'].push({
          title: `${styles_class_mapping[style]} fa-${icon_name}`,
          searchTerms: icon_info.search.terms,
        })
      });
    })

    process.stdout.write('\nProcessing Icons complete\n');
    // console.log(icons_with_search_terms);
    file.contents = Buffer.from(JSON.stringify(icons_with_search_terms));
    this.push(file);
    cb();
  })

}


gulp.task('icons-json', function () {
  return gulp.src(['fontawesome/icons.json'])
    .pipe(createIcons())
    .pipe(gulp.dest('json'))
});


/**
 * Default task, running just `gulp` will update icons json file.
 */
gulp.task('default', ['icons-json']);
