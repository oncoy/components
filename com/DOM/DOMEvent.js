/**
 * Created by xcp on 2016/3/19.
 */

var isElement = function (elem) {
    var result = false;
    try{
        result = elem.nodeType === 1;
    }catch (e){}
    return result;
};

var body = require('./DOMBody');
var isW3c = !!body.addEventListener;
var ADD_EVENT_NAME = isW3c ? 'addEventListener' : 'attachEvent';
var REMOVE_EVENT_NAME = isW3c ? 'removeEventListener' : 'detachEvent';
var EVENT_TYPE_PREFIX = isW3c ? '' : 'on';

var eventType = function (type) {
    return EVENT_TYPE_PREFIX + type
};

var factory = function (handleName) {
    return function (elem, type, handle, capture) {
        if (!isElement(elem)) return elem;
        if (elem[handleName]) {
            elem[handleName](eventType(type), handle, capture)
        }
        return elem
    }
};

module.exports = {
    on: factory(ADD_EVENT_NAME),
    off: factory(REMOVE_EVENT_NAME)
};