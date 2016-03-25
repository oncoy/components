'use strict';

/**
 * Created by xcp on 2016/3/14.
 */

var React = require('react');
var noop = require('../../com/noop');
var ConditionMixins = require('./ConditionMixins');
var classNames = require('classnames');

var ConditionItem = React.createClass({
    displayName: 'ConditionItem',

    mixins: [ConditionMixins],

    getInitialState: function getInitialState() {
        return {
            isChecked: false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: 'cond-item',
            checkedClassName: 'checked',
            children: null,
            value: null,
            onChecked: noop,
            onChange: noop,
            isChecked: false
        };
    },

    componentWillMount: function componentWillMount() {
        this.setState({ isChecked: this.props.isChecked });
    },

    // todo 该组件设计得有点绕，得改
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ isChecked: nextProps.isChecked });
    },

    onChecked: function onChecked() {
        this.setState({ isChecked: !this.state.isChecked }, function () {
            this.props.onChecked(this.state.isChecked, this.props.value);
        });
    },

    render: function render() {
        var props = this.props;
        var className = {};

        className[props.className] = true;
        className[props.checkedClassName] = props.isChecked;

        return React.createElement(
            'span',
            {
                className: classNames(className),
                onClick: this.onChecked },
            props.children
        );
    }

});

module.exports = ConditionItem;