/**
 * Created by xcp on 2016/3/14.
 */

var TweenEventMapping = ['Start', 'Update', 'Complete', 'Stop'];
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
        styleProps: React.PropTypes.object,
        from: React.PropTypes.object,
        to: React.PropTypes.object,
        during: React.PropTypes.number,
        delay: React.PropTypes.number,
        repeat: React.PropTypes.number,
        easing: React.PropTypes.func,
        className: React.PropTypes.string
    },

    getDefaultProps: function () {
        var props = {};

        TweenEventMapping.forEach(function (name) {
            props['on' + name] = noop;
        });

        return assign(props, {
            className: '',
            component: 'span',
            styleProps: {},
            from: {},
            to: {},
            during: 1000,
            delay: 0,
            repeat: 0,
            easing: TWEEN.Easing.Linear.None
        });
    },

    styleProps: function () {
        return assign({}, this.state.to, this.props.styleProps);
    },

    onTweenUpdate: function (result) {
        this.setState({to: result})
    },

    backToTheStart: function () {
        this.animate(this.props.to, this.props.from);
    },

    animate: function (from, to) {
        var self = this;
        var id = null;
        var props = this.props;
        var animate = null;
        var cancelAnimate = null;

        from = assign({}, from);
        to = assign({}, to);

        var tween = this.__tween = new Tween(from)
            .to(to, props.during)
            .delay(props.delay)
            .repeat(props.repeat)
            .easing(props.easing);

        tween.onStart(function () {
            props.onStart.call(self);
        });

        tween.onUpdate(function () {
            // this 为 tween 中的 props 对象
            // 所以可以直接传递给函数
            props.onUpdate.call(self, this);
            self.onTweenUpdate.call(self, this)
        });

        tween.onComplete(cancelAnimate);

        tween.onStop(function () {
            cancelAnimate();
            props.onStop.call(this);
        });

        tween.start();

        cancelAnimate = function () {
            if (id !== null) {
                cancelAnimationFrame(id);
                id = null;
            }
        };

        animate = function (time) {
            id = requestAnimationFrame(animate);
            TWEEN.update(time);
        };

        animate();
    },

    componentDidMount: function () {
        this.animate(this.props.from, this.props.to);
    }
};