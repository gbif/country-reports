function i18n() {
   return new (require('i18n-2'))({
    locales: ['en', 'da'],
    directory: __dirname + '/locales',
    extension: '.json',
    objectNotation: true
});
}

module.exports = i18n;
