/**
 * Created by xcp on 2016/3/18.
 */

var ReactDOM = require('react-dom');
var noop = require('../../com/noop');

module.exports = {

    getInitialState: function () {
        return {isVisible: true}
    },

    getDefaultProps: function () {
        this.__backToTheStart = noop;
        return {
            message: '',
            during: 3000,
            onComplete: noop,
            closeable: false,
            afterClose: noop,
            animate: {
                component: 'span',
                from: {opacity: 0},
                to: {opacity: 1},
                during: 500
            }
        }
    },

    // export animate
    animateDidMount: function (animate) {
        this.__backToTheStart = animate.backToTheStart;
    },

    unmount: function () {
        var self = this;
        var mountNode = ReactDOM.findDOMNode(self).parentNode;
        if (typeof self.__backToTheStart === 'function') {
            self.__backToTheStart(function () {
                ReactDOM.unmountComponentAtNode(mountNode);
            })
        } else {
            ReactDOM.unmountComponentAtNode(mountNode)
        }
        self.props.afterClose();
    },

    autoUnmount: function () {
        setTimeout(this.unmount, this.props.during)
    }
};