'use strict';

/**
 * Created by xcp on 2016/3/14.
 */

var TweenEvents = ['Start', 'Update', 'Complete', 'Stop'];
var noop = require('../../com/noop');
var TWEEN = require('tween');
var Tween = TWEEN.Tween;
var requestAnimation = require('../../com/requestAnimationFrame');
var requestAnimationFrame = requestAnimation.requestAnimationFrame;
var cancelAnimationFrame = requestAnimation.cancelAnimationFrame;
var assign = require('object-assign');
var React = require('react');

module.exports = {

    propTypes: {
        component: React.PropTypes.string,
        style: React.PropTypes.object,
        from: React.PropTypes.object,
        to: React.PropTypes.object,
        during: React.PropTypes.number,
        delay: React.PropTypes.number,
        repeat: React.PropTypes.number,
        easing: React.PropTypes.func,
        className: React.PropTypes.string
    },

    getInitialState: function getInitialState() {
        return { to: {} };
    },

    getDefaultProps: function getDefaultProps() {
        var props = {};

        TweenEvents.forEach(function (name) {
            props['on' + name] = noop;
        });

        return assign(props, {
            className: '',
            component: 'span',
            styleProps: { position: 'absolute' },
            from: {},
            to: {},
            during: 1000,
            delay: 0,
            repeat: 0,
            componentDidMount: noop,
            easing: TWEEN.Easing.Linear.None
        });
    },

    styleProps: function styleProps() {
        return assign({}, this.state.to, this.props.style);
    },

    onTweenUpdate: function onTweenUpdate(result) {
        this.setState({ to: result });
    },

    backToTheStart: function backToTheStart(callback) {
        this.animate(this.props.to, this.props.from, callback);
    },

    animate: function animate(from, to, callback) {
        var self = this;
        var id = null;
        var props = this.props;
        var _animate = null;
        var cancelAnimate = null;

        from = assign({}, from);
        to = assign({}, to);

        var tween = this.__tween = new Tween(from).to(to, props.during).delay(props.delay).repeat(props.repeat).easing(props.easing);

        tween.onStart(function () {
            props.onStart.call(self);
        });

        tween.onUpdate(function () {
            // this 为 tween 中的 props 对象
            // 所以可以直接传递给函数
            props.onUpdate.call(self, this);
            self.onTweenUpdate.call(self, this);
        });

        tween.onComplete(function () {
            typeof callback === 'function' && callback();
            cancelAnimate();
        });

        tween.onStop(function () {
            cancelAnimate();
            props.onStop.call(this);
        });

        tween.start();

        cancelAnimate = function cancelAnimate() {
            if (id !== null) {
                cancelAnimationFrame(id);
                id = null;
            }
        };

        _animate = function animate(time) {
            id = requestAnimationFrame(_animate);
            TWEEN.update(time);
        };

        _animate();
    },

    componentDidMount: function componentDidMount() {
        this.props.componentDidMount(this);
        this.animate(this.props.from, this.props.to, this.props.onComplete);
    }
};