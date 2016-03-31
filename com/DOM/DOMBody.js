/**
 * Created by xcp on 2016/3/19.
 */

module.exports = require('../runtimeIsNode')() ? {} : document.body || document.documentElement;
