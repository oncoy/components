/**
 * Created by xcp on 2016/3/15.
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
        return {isVisible: true}
    },

    getDefaultProps: function () {
        return {
            component: 'div',
            style: {backgroundColor: '#fff'},
            children: null,
            onVisible: noop,
            exceptElement: null
        }
    },

    componentDidMount: function () {
        var self = this;
        this.setState({isVisible: this.props.isVisible});

        this.__body = document.body || document.documentElement.body;

        this.__bodyHandle = function (e) {
            var target = e.target || e.srcElement;
            var mountNode = ReactDOM.findDOMNode(self);

            var canUnmount = !contains(mountNode, target) && (self.props.exceptElement ?
                        !contains(self.props.exceptElement, target) :
                        true
                );

            if (canUnmount) {
                var parent = self.props.parent;

                if (parent && parent.backToTheStart)
                    parent.backToTheStart(function () {
                        ReactDOM.unmountComponentAtNode(mountNode);
                        self.props.onVisible();
                    });
            }
        };
        addEvent(this.__body, 'click', this.__bodyHandle, false);
        this.setState({isVisible: this.props.isVisible})
    },

    componentWillUnmount: function () {
        removeEvent(this.__body, 'click', this.__bodyHandle, false)
    },

    render: function () {
        var props = this.props;
        var Component = props.component;
        var style = assign({}, props.style);

        if (this.state.isVisible) {
            style = assign(style, {display: 'none'})
        }

        return (<Component style={style}>
            {props.children}
        </Component>)
    }
});

module.exports = PopupWrap;