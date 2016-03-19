/**
 * Created by xcp on 2016/3/19.
 */
"use strict";

var ReactDOM = require('react-dom');
var Message = require('./Message');
var body = require('../../com/DOM/DOMBody');
var mountNodeWrap = document.createElement('div');
mountNodeWrap.style.cssText = 'position:absolute;top:20px;left:50%;';
body.appendChild(mountNodeWrap);

module.exports = function (message, callback) {
    var mountNode = document.createElement('div');
    mountNode.style.cssText = 'margin-bottom:10px';
    mountNodeWrap.appendChild(mountNode);
    var afterClose = function () {
        callback && callback();
        mountNodeWrap.removeChild(mountNode);
    };

    ReactDOM.render(
        <Message
            message={message}
            afterClose={afterClose}/>,
        mountNode
    )
};

