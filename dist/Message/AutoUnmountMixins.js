'use strict';

/**
 * Created by xcp on 2016/3/18.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var noop = require('../../com/noop');

module.exports = {
    getDefaultProps: function getDefaultProps() {
        this.__backToTheStart = noop;
        return {
            message: '',
            during: 3000,
            onComplete: noop
        };
    },

    autoUnmount: function autoUnmount() {
        var self = this;
        setTimeout(function () {
            self.__backToTheStart(function () {
                ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(self));
            });
        }, self.props.during);
    }
};