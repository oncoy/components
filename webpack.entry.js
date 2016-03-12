/**
 * Created by xcp on 2016/3/12.
 */

"use strict";
const path = require('path');
const componentsBasePath = path.join(process.cwd(), './dist');

let _path = function (name) {
    return path.join(componentsBasePath, name, '/demo/index');
};

module.exports = {
    Animate: _path('Animate')
};
