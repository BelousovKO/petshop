const browserSync = require('browser-sync');

// вызываем эту функцию

browserSync({

    server: "app",

    files: ["app/*.html", "app/css/*.css", "app/js/*.js"]

});