'use strict';

/**
 * Created by xcp on 2016/3/24.
 */
var React = require('react');
var noop = require('../../com/noop');

module.exports = {

    propTypes: {
        itemList: React.PropTypes.array,
        defaultSelectedValue: React.PropTypes.any,
        onSelect: React.PropTypes.func
    },

    getInitialState: function getInitialState() {
        return {
            panelStateIsShow: false,
            currentSelectedValue: null
        };
    },

    getDefaultProps: function getDefaultProps() {
        var itemList = [];
        return {
            itemList: itemList,
            defaultSelectedValue: itemList[0],
            onSelect: noop
        };
    },

    onSelect: function onSelect(value) {
        var self = this;
        self.setState({ currentSelectedValue: value }, function () {
            self.props.onSelect(value);
        });
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

    onAnimateMount: function onAnimateMount(animate) {
        this.__animate = animate;
    },

    showPanel: function showPanel() {
        var self = this;
        self.setState({ panelStateIsShow: true }, function () {
            var animate = self.__animate;
            var animateProps = animate.props;
            animate.animate(animateProps.from, animateProps.to);
        });
    },

    componentWillMount: function componentWillMount() {
        this.setState({ currentSelectedValue: this.props.defaultSelectedValue });
    }
};