/**
 * Created by xcp on 2016/3/18.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var noop = require('../../com/noop');

module.exports = {
    getDefaultProps: function () {
        this.__backToTheStart = noop;
        return {
            message: '',
            during: 3000
        }
    },

    componentDidMount: function () {
        var self = this;
        setTimeout(function () {
            var mountNode = ReactDOM.findDOMNode(self);
            self.__backToTheStart(function () {
                ReactDOM.unmountComponentAtNode(self);
            })
        }, self.props.during);
    }
};