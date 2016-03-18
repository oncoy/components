/**
 * Created by xcp on 2016/3/15.
 * PopupWrap 的作用：
 * 1. 确定 popup 的位置
 * 2. 监听 body click 事件，卸载元素
 */

var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign');
var contains = require('../../com/contains');
var noop = require('../../com/noop');

var addEvent = function (elem, type, handle, capture) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, capture);
    } else {
        elem.attachEvent('on' + type, handle, capture);
    }
};

var removeEvent = function (elem, type, handle, capture) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handle, capture)
    } else {
        elem.detachEvent('on' + type, handle, capture)
    }
};

var PopupWrap = React.createClass({

    getInitialState: function () {
        return {
            left: 0,
            top: 0
        }
    },

    getDefaultProps: function () {
        return {
            component: 'div',
            styleProps: {backgroundColor: '#fff'},
            children: null,
            onVisible: noop,
            exceptElement: null,
            isVisible: false
        }
    },

    componentDidMount: function () {
        var self = this;

        this.__body = document.body || document.documentElement.body;

        this.__bodyHandle = function (e) {
            var target = e.target || e.srcElement;
            var mountNode = ReactDOM.findDOMNode(self);
            var props = self.props;

            if (props.refTarget && contains(props.refTarget, target)) {
                return
            }

            if (!contains(mountNode, target)) {
                var parent = props.parent;

                if (parent && parent.backToTheStart)
                    parent.backToTheStart(function () {
                        props.onVisible();
                    });
            }
        };

        addEvent(this.__body, 'click', this.__bodyHandle, false);

        var node = this.__node = ReactDOM.findDOMNode(this);
        var position = {x: node.offsetWidth, y: node.offsetHeight};

        switch (this.props.placement) {
            case "top":
                position.x = -(position.x - this.props.refTarget.offsetWidth) / 2;
                position.y = -position.y;
                break;
            case "bottom":
                position.x = -position.x / 2;
                break;
            default:
                position.x = 0;
                position.y = 0;
        }
        this.setState({left: position.x, top: position.y})
    },

    componentWillUnmount: function () {
        removeEvent(this.__body, 'click', this.__bodyHandle, false)
    },

    render: function () {
        var props = this.props;
        var Component = props.component;
        var style = assign({}, props.styleProps, {
            top: this.state.top,
            left: this.state.left,
            position: 'absolute'
        });

        if (props.isVisible) {
            style = assign(style, {display: 'none'})
        }

        return (<Component style={style}>
            {props.children}
        </Component>)
    }
});

module.exports = PopupWrap;