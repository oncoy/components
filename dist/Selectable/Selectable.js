'use strict';

/**
 * Created by xcp on 2016/3/22.
 */

var React = require('react');
var noop = require('../../com/noop');
var classNames = require('classnames');
var HideOnBodyClick = require('../HideOnBodyClick');

var Selectable = React.createClass({
    displayName: 'Selectable',

    getDefaultProps: function getDefaultProps() {
        return {
            onSelect: noop,
            componentDidMount: noop,
            selectorBindEvent: true,
            selectorContent: null,
            panelContent: null
        };
    },

    getInitialState: function getInitialState() {
        return {
            panelStateIsShow: false
        };
    },

    componentDidMount: function componentDidMount() {
        this.props.componentDidMount(this);
    },

    showPanel: function showPanel() {
        var self = this;
        self.setState({ panelStateIsShow: true }, function () {
            var animate = self.__animate;
            var animateProps = animate.props;
            animate.animate(animateProps.from, animateProps.to);
        });
    },

    onAnimateMount: function onAnimateMount(animate) {
        this.__animate = animate;
    },

    onSelect: function onSelect(item) {
        var self = this;
        self.props.onSelect(item);
        self.__animate.backToTheStart(function () {
            self.onVisible();
        });
    },

    onVisible: function onVisible() {
        this.setState({ panelStateIsShow: false });
    },

    triggerHide: function triggerHide() {
        return this.state.panelStateIsShow;
    },

    render: function render() {
        var props = this.props;
        var className = classNames({
            'comp-custom-select': true,
            'comp-show-panel': this.state.panelStateIsShow
        });

        var selector = null;
        if (props.selectorBindEvent) {
            selector = React.createElement(
                'div',
                { onClick: this.showPanel },
                props.selectorContent
            );
        } else {
            selector = props.selectorContent;
        }

        // todo 加载完成后，应该计算最长的宽度是多少，以免换行
        // 或者应该用样式自己控制？如果此处写死了 width，也是个麻烦
        // 再说吧
        return React.createElement(
            'div',
            { className: className, ref: 'selectable' },
            React.createElement(
                'div',
                { className: 'comp-select-selector-pd' },
                selector
            ),
            React.createElement(
                HideOnBodyClick,
                {
                    refTarget: this.refs.selectable,
                    onVisible: this.onVisible,
                    onAnimateMount: this.onAnimateMount,
                    triggerHide: this.triggerHide },
                React.createElement(
                    'div',
                    { className: 'comp-select-panel' },
                    props.panelContent
                )
            )
        );
    }

});

module.exports = Selectable;