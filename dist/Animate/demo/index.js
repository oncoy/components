'use strict';

/**
 * Created by xcp on 2016/3/12.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Animate = require('../index');
var AnimateChild = React.createClass({
    displayName: 'AnimateChild',
    render: function render() {
        var parent = this.props.parent;
        return React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                null,
                this.props.name
            ),
            React.createElement(
                'button',
                { onClick: parent.backToTheStart.bind(parent, null) },
                '出场'
            )
        );
    }
});

var TWEEN = require('tween');

// 最简单的调用
ReactDOM.render(React.createElement(
    Animate,
    {
        from: { left: 0 },
        to: { left: 400 },
        style: { position: 'absolute', background: 'red' } },
    React.createElement(AnimateChild, { name: 'Animate Child', key: 'animate-child' })
), document.getElementById('demo'));

// 传入参数
ReactDOM.render(React.createElement(
    Animate,
    {
        from: { left: 0 },
        during: 500,
        repeat: 2,
        delay: 300,
        component: 'div',
        to: { left: 400 },
        easing: TWEEN.Easing.Back.InOut,
        style: { position: 'absolute', background: 'red', overflow: 'hidden', top: 50 } },
    React.createElement(AnimateChild, { name: 'Animate Child 1', key: 'animate-child-1-1' })
), document.getElementById('demo-1'));