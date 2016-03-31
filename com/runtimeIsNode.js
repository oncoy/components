/**
 * Created by xcp on 2016/3/30.
 */

var root = this;

module.exports = function () {
    return typeof root === 'object' && !root.document
};
