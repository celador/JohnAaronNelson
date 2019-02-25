---
title: coffeescript/.cjsx -> ES6 Class
date: "2018-07-30T00:00:00.000Z"
---

https://github.com/bugsnag/depercolator to convert regular coffeescript to javascript(ES6)

depercolate src/\*_/_.coffee

https://github.com/Gusto/cjsx-converter

cjsx-converter src/\*_/_.cjsx

createClass to ES6 Class https://daveceddia.com/convert-createclass-to-es6-class/ using React-Codemod

jscodeshift -t ~/Github/Clearbit/react-codemod/transforms/class.js --mixin-module-name=react-addons-pure-render-mixin --flow=true --pure-component=true --remove-runtime-proptypes=false /Users/john/Github/Clearbit/salesforce-appexchange/spa/UI/src/javascript/\*_/_.js
https://github.com/babel/babelify to replace coffeescript-watchify

bundler.transform('babelify', {
presets: ['babel-preset-env', 'babel-preset-react'],
plugins: ['transform-class-properties']
});
